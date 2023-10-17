# parse the sitecore.json file for the XM Cloud plugin version
[CmdletBinding(DefaultParameterSetName = 'FromArgs')]
param (
    [Parameter(Mandatory)]
    [string]$EnvironmentId
)

$ErrorActionPreference = "Stop"

$XmCloudDeployApi = (Get-Content "$PSScriptRoot\.sitecore\user.json" | ConvertFrom-Json).endpoints.xmCloud.host
$XmCloudDeployAccessToken = (Get-Content "$PSScriptRoot\.sitecore\user.json" | ConvertFrom-Json).endpoints.xmCloud.accessToken

$Headers = @{"Authorization" = "Bearer $XmCloudDeployAccessToken" }
$URL = @(
    "$($XmCloudDeployApi)api/environments/v1"
    $EnvironmentId
    'obtain-edge-token'
)

$Response = Invoke-RestMethod ($URL -join '/') -Method 'GET' -Headers $Headers -Verbose
$AccessToken = $Response.apiKey
$EdgeUrl = "$($Response.edgeUrl)api/graphql/ide"
Write-Host "Launching Edge GraphQL IDE"
Write-Host "Add { ""X-GQL-Token"" : ""$AccessToken"" } to the HTTP HEADERS tab at the bottom-left of the screen to write queries against your content"
Start-Process $EdgeUrl
