param (
    $FeatureName = "BasicContent"
)

$FeatureNameLower = $FeatureName.ToLower()
$ModuleTemplatePath = ".\merkle.feature.$FeatureNameLower"

New-Item -Path $ModuleTemplatePath -ItemType Directory
Copy-Item ".\.feature.template.config" $ModuleTemplatePath -Recurse
Rename-Item -Path "$ModuleTemplatePath\.feature.template.config" ".template.config"
Rename-Item -Path "$ModuleTemplatePath\.template.config\template.json-template" "template.json"

Set-Location $ModuleTemplatePath
(Get-Content ".\.template.config\template.json").replace('modulenamelower', $FeatureNameLower) | Set-Content ".\.template.config\template.json"
(Get-Content ".\.template.config\template.json").replace('modulename', $FeatureName) | Set-Content ".\.template.config\template.json"

dotnet new merkle.headless.module -n $FeatureName -cn "companyname" -hl "Feature"

cd "..\.."
dotnet sln XmCloudSXAStarter.sln add "scaffolding\merkle.feature.$FeatureName\src\Feature\$FeatureName\website\companyname.Feature.$FeatureName.csproj" --solution-folder "Feature/$FeatureName"
