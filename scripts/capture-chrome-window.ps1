param(
    [string]$Spec = "cypress/e2e/features/**/*.feature"
)

$ErrorActionPreference = "Stop"

$ProjectRoot = Resolve-Path (
    Join-Path $PSScriptRoot ".."
)

Set-Location $ProjectRoot

Write-Host ""
Write-Host "Projeto: $ProjectRoot"
Write-Host "Spec: $Spec"
Write-Host "Navegador: Chrome"
Write-Host ""

try {
    npx cypress run `
        --browser chrome `
        --headed `
        --spec $Spec

    if ($LASTEXITCODE -ne 0) {
        throw "A execução do Cypress apresentou falhas."
    }

    Write-Host ""
    Write-Host "Execução concluída com sucesso."
}
catch {
    Write-Error $_
    exit 1
}