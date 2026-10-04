# deploy.ps1
param([string]$msg = "Site update $(Get-Date -Format 'yyyy-MM-dd HH:mm')")

$repo   = "F:\mat.github.io"
$src    = "master"     # branch GitHub Desktop commits to
$deploy = "gh-pages"   # branch that deploys to GoDaddy

function Git-Run { git @args; if ($LASTEXITCODE -ne 0) { throw "git $args failed" } }

Set-Location $repo
Git-Run checkout $src

if (git status --porcelain) {
    Git-Run add -A
    Git-Run commit -m $msg
} else {
    Write-Host "No new changes to commit; deploying what's already committed."
}
Git-Run push origin $src

Git-Run checkout $deploy
Git-Run pull origin $deploy
Git-Run merge $src --no-edit
Git-Run push origin $deploy
Git-Run checkout $src

Write-Host "Deployed." -ForegroundColor Green