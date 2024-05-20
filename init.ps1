[CmdletBinding(DefaultParameterSetName = "no-arguments")]
Param (
    [Parameter(HelpMessage = "Enables initialization of values in the .env file, which may be placed in source control.",
        ParameterSetName = "env-init")]
    [switch]$InitEnv,

    [Parameter(Mandatory = $true,
        HelpMessage = "The path to a valid Sitecore license.xml file.",
        ParameterSetName = "env-init")]
    [string]$LicenseXmlPath,

    # We do not need to use [SecureString] here since the value will be stored unencrypted in .env,
    # and used only for transient local development environments.
    [Parameter(Mandatory = $true,
        HelpMessage = "Sets the sitecore\\admin password for this environment via environment variable.",
        ParameterSetName = "env-init")]
    [string]$AdminPassword,

    [Parameter(Mandatory = $false, HelpMessage = "Specifies os version of the base image.")]
    [ValidateSet("ltsc2019", "ltsc2022")]
    [string]$baseOs = "ltsc2019"
)

$ErrorActionPreference = "Stop";

if ($InitEnv) {
    if (-not $LicenseXmlPath.EndsWith("license.xml")) {
        Write-Error "Sitecore license file must be named 'license.xml'."
    }
    if (-not (Test-Path $LicenseXmlPath)) {
        Write-Error "Could not find Sitecore license file at path '$LicenseXmlPath'."
    }
    # We actually want the folder that it's in for mounting
    $LicenseXmlPath = (Get-Item $LicenseXmlPath).Directory.FullName
}

Write-Host "Preparing your Sitecore Containers environment!" -ForegroundColor Green

################################################
# Retrieve and import SitecoreDockerTools module
################################################

# Check for Sitecore Gallery
Import-Module PowerShellGet
$SitecoreGallery = Get-PSRepository | Where-Object { $_.SourceLocation -eq "https://nuget.sitecore.com/resources/v2" }
if (-not $SitecoreGallery) {
    Write-Host "Adding Sitecore PowerShell Gallery..." -ForegroundColor Green
    Unregister-PSRepository -Name SitecoreGallery -ErrorAction SilentlyContinue
    Register-PSRepository -Name SitecoreGallery -SourceLocation https://nuget.sitecore.com/resources/v2 -InstallationPolicy Trusted
    $SitecoreGallery = Get-PSRepository -Name SitecoreGallery
}

# Install and Import SitecoreDockerTools
$dockerToolsVersion = "10.2.7"
Remove-Module SitecoreDockerTools -ErrorAction SilentlyContinue
if (-not (Get-InstalledModule -Name SitecoreDockerTools -RequiredVersion $dockerToolsVersion -ErrorAction SilentlyContinue)) {
    Write-Host "Installing SitecoreDockerTools..." -ForegroundColor Green
    Install-Module SitecoreDockerTools -RequiredVersion $dockerToolsVersion -Scope CurrentUser -Repository $SitecoreGallery.Name
}
Write-Host "Importing SitecoreDockerTools..." -ForegroundColor Green
Import-Module SitecoreDockerTools -RequiredVersion $dockerToolsVersion
Write-SitecoreDockerWelcome

##################################
# Configure TLS/HTTPS certificates
##################################

Push-Location docker\traefik\certs
try {
    $mkcert = ".\mkcert.exe"
    if ($null -ne (Get-Command mkcert.exe -ErrorAction SilentlyContinue)) {
        # mkcert installed in PATH
        $mkcert = "mkcert"
    } elseif (-not (Test-Path $mkcert)) {
        Write-Host "Downloading and installing mkcert certificate tool..." -ForegroundColor Green
        Invoke-WebRequest "https://github.com/FiloSottile/mkcert/releases/download/v1.4.1/mkcert-v1.4.1-windows-amd64.exe" -UseBasicParsing -OutFile mkcert.exe
        if ((Get-FileHash mkcert.exe).Hash -ne "1BE92F598145F61CA67DD9F5C687DFEC17953548D013715FF54067B34D7C3246") {
            Remove-Item mkcert.exe -Force
            throw "Invalid mkcert.exe file"
        }
    }
    Write-Host "Generating Traefik TLS certificate..." -ForegroundColor Green
    & $mkcert -install
    & $mkcert "*.sxastarter.localhost"
    & $mkcert "xmcloudcm.localhost"

    # stash CAROOT path for messaging at the end of the script
    $caRoot = "$(& $mkcert -CAROOT)\rootCA.pem"
}
catch {
    Write-Error "An error occurred while attempting to generate TLS certificate: $_"
}
finally {
    Pop-Location
}


################################
# Add Windows hosts file entries
################################

Write-Host "Adding Windows hosts file entries..." -ForegroundColor Green

Add-HostsEntry "xmcloudcm.localhost"
Add-HostsEntry "www.sxastarter.localhost"

###############################
# Generate scjssconfig
###############################

$xmCloudBuild = Get-Content "xmcloud.build.json" | ConvertFrom-Json
Set-EnvFileVariable "JSS_DEPLOYMENT_SECRET_xmcloudpreview" -Value $xmCloudBuild.renderingHosts.xmcloudpreview.jssDeploymentSecret

################################
# Generate Sitecore Api Key
################################

$sitecoreApiKey = (New-Guid).Guid
Set-EnvFileVariable "SITECORE_API_KEY_xmcloudpreview" -Value $sitecoreApiKey

################################
# Generate JSS_EDITING_SECRET
################################
$jssEditingSecret = Get-SitecoreRandomString 64 -DisallowSpecial
Set-EnvFileVariable "JSS_EDITING_SECRET" -Value $jssEditingSecret

###############################
# Populate the environment file
###############################

if ($InitEnv) {

    Write-Host "Populating required .env file values..." -ForegroundColor Green

    # HOST_LICENSE_FOLDER
    Set-EnvFileVariable "HOST_LICENSE_FOLDER" -Value $LicenseXmlPath

    # CM_HOST
    Set-EnvFileVariable "CM_HOST" -Value "xmcloudcm.localhost"

    # RENDERING_HOST
    Set-EnvFileVariable "RENDERING_HOST" -Value "www.sxastarter.localhost"

    # REPORTING_API_KEY = random 64-128 chars
    Set-EnvFileVariable "REPORTING_API_KEY" -Value (Get-SitecoreRandomString 128 -DisallowSpecial)

    # TELERIK_ENCRYPTION_KEY = random 64-128 chars
    Set-EnvFileVariable "TELERIK_ENCRYPTION_KEY" -Value (Get-SitecoreRandomString 128)

    # MEDIA_REQUEST_PROTECTION_SHARED_SECRET
    Set-EnvFileVariable "MEDIA_REQUEST_PROTECTION_SHARED_SECRET" -Value (Get-SitecoreRandomString 64)

    # SQL_SA_PASSWORD
    # Need to ensure it meets SQL complexity requirements
    Set-EnvFileVariable "SQL_SA_PASSWORD" -Value (Get-SitecoreRandomString 19 -DisallowSpecial -EnforceComplexity)

    # SQL_SERVER
    Set-EnvFileVariable "SQL_SERVER" -Value "mssql"

    # SQL_SA_LOGIN
    Set-EnvFileVariable "SQL_SA_LOGIN" -Value "sa"

    # SITECORE_ADMIN_PASSWORD
    Set-EnvFileVariable "SITECORE_ADMIN_PASSWORD" -Value $AdminPassword

    # SITECORE_VERSION
    Set-EnvFileVariable "SITECORE_VERSION" -Value "1-$baseOS"

    # EXTERNAL_IMAGE_TAG_SUFFIX
    Set-EnvFileVariable "EXTERNAL_IMAGE_TAG_SUFFIX" -Value $baseOS
}

Write-Host "Done!" -ForegroundColor Green

Push-Location docker\traefik\certs
try
{
    Write-Host
    Write-Host ("#"*75) -ForegroundColor Cyan
    Write-Host "To avoid HTTPS errors, set the NODE_EXTRA_CA_CERTS environment variable" -ForegroundColor Cyan
    Write-Host "using the following commmand:" -ForegroundColor Cyan
    Write-Host "setx NODE_EXTRA_CA_CERTS $caRoot"
    Write-Host
    Write-Host "You will need to restart your terminal or VS Code for it to take effect." -ForegroundColor Cyan
    Write-Host ("#"*75) -ForegroundColor Cyan
}
catch {
    Write-Error "An error occurred while attempting to generate TLS certificate: $_"
}
finally {
    Pop-Location
}