# PowerShell script to set up local semantic release testing
Write-Host "Setting up local semantic release testing environment" -ForegroundColor Green
Write-Host ""

# Check current status
Write-Host "Current Status:" -ForegroundColor Yellow
if ($env:NPM_TOKEN) {
    Write-Host "NPM_TOKEN: Set (hidden)" -ForegroundColor Green
} else {
    Write-Host "NPM_TOKEN: Not set" -ForegroundColor Red
}

if ($env:GITHUB_TOKEN) {
    Write-Host "GITHUB_TOKEN: Set (hidden)" -ForegroundColor Green  
} else {
    Write-Host "GITHUB_TOKEN: Not set" -ForegroundColor Red
}
Write-Host ""

# NPM Token setup
if (-not $env:NPM_TOKEN) {
    Write-Host "NPM Token Setup Required:" -ForegroundColor Red
    Write-Host "1. Go to https://npmjs.com -> Sign in"
    Write-Host "2. Profile -> Access Tokens -> Generate New Token"
    Write-Host "3. Choose 'Automation' type"
    Write-Host "4. Copy the token"
    Write-Host ""
    Write-Host "Then run this command:" -ForegroundColor Cyan
    Write-Host "`$env:NPM_TOKEN = 'your_npm_token_here'"
    Write-Host ""
}

# GitHub Token setup  
if (-not $env:GITHUB_TOKEN) {
    Write-Host "GitHub Token Setup Required:" -ForegroundColor Red
    Write-Host "1. Go to https://github.com/settings/tokens"
    Write-Host "2. Generate new token (classic)"
    Write-Host "3. Select scopes: repo, write:packages"
    Write-Host "4. Copy the token"
    Write-Host ""
    Write-Host "Then run this command:" -ForegroundColor Cyan
    Write-Host "`$env:GITHUB_TOKEN = 'your_github_token_here'"
    Write-Host ""
}

if ($env:NPM_TOKEN -and $env:GITHUB_TOKEN) {
    Write-Host "All tokens set! Ready to test semantic release" -ForegroundColor Green
    Write-Host ""
    Write-Host "Run this to test:" -ForegroundColor Cyan
    Write-Host "npx semantic-release --dry-run --no-ci"
} else {
    Write-Host "Please set up the missing tokens above" -ForegroundColor Yellow
}
