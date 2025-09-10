# PowerShell script to set up local semantic release testing
Write-Host "🔧 Setting up local semantic release testing environment" -ForegroundColor Green
Write-Host ""

# Check current status
Write-Host "📊 Current Status:" -ForegroundColor Yellow
Write-Host "NPM_TOKEN: $(if ($env:NPM_TOKEN) { '✅ Set (hidden)' } else { '❌ Not set' })"
Write-Host "GITHUB_TOKEN: $(if ($env:GITHUB_TOKEN) { '✅ Set (hidden)' } else { '❌ Not set' })"
Write-Host ""

# NPM Token setup
if (-not $env:NPM_TOKEN) {
    Write-Host "🔑 NPM Token Setup Required:" -ForegroundColor Red
    Write-Host "1. Go to https://npmjs.com -> Sign in"
    Write-Host "2. Profile -> Access Tokens -> Generate New Token"
    Write-Host "3. Choose 'Automation' type"
    Write-Host "4. Copy the token"
    Write-Host ""
    Write-Host "Then run: " -NoNewline
    Write-Host "`$env:NPM_TOKEN = 'your_token_here'" -ForegroundColor Cyan
    Write-Host ""
}

# GitHub Token setup  
if (-not $env:GITHUB_TOKEN) {
    Write-Host "🔑 GitHub Token Setup Required:" -ForegroundColor Red
    Write-Host "1. Go to https://github.com/settings/tokens"
    Write-Host "2. Generate new token (classic)"
    Write-Host "3. Select scopes: repo, write:packages"
    Write-Host "4. Copy the token"
    Write-Host ""
    Write-Host "Then run: " -NoNewline
    Write-Host "`$env:GITHUB_TOKEN = 'your_token_here'" -ForegroundColor Cyan
    Write-Host ""
}

if ($env:NPM_TOKEN -and $env:GITHUB_TOKEN) {
    Write-Host "🎉 All tokens set! Ready to test semantic release" -ForegroundColor Green
    Write-Host ""
    Write-Host "Run this to test:" -ForegroundColor Cyan
    Write-Host "cd 'C:\Users\Admin\Documents\coding\tamyla\ui-platform\packages\ui-components-react'"
    Write-Host "npx semantic-release --dry-run --no-ci"
    Write-Host ""
    
    # Optional: Run test automatically
    $response = Read-Host "Run semantic release test now? (y/n)"
    if ($response -eq 'y' -or $response -eq 'Y') {
        Write-Host "🚀 Running semantic release test..." -ForegroundColor Green
        Set-Location "C:\Users\Admin\Documents\coding\tamyla\ui-platform\packages\ui-components-react"
        npx semantic-release --dry-run --no-ci
    }
} else {
    Write-Host "⚠️  Please set up the missing tokens above, then run this script again" -ForegroundColor Yellow
}
