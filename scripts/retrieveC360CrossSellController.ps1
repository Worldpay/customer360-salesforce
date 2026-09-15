# Retrieve exact C360CrossSellController from the default Salesforce CLI org.
# Overwrites force-app/main/default/classes/C360CrossSellController.cls (+ meta).
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

if (-not (Get-Command sf -ErrorAction SilentlyContinue)) {
    Write-Error "Salesforce CLI (sf) not found. Install CLI, authenticate, then re-run this script."
}

sf project retrieve start -m ApexClass:C360CrossSellController
Write-Host "Copy retrieved class to classesStubsEx05/ if it differs from force-app (reference sync)."
