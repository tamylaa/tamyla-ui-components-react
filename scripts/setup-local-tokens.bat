@echo off
echo Setting up local environment variables for semantic release testing
echo.
echo STEP 1: Set NPM Token
echo First, you need to get your NPM token:
echo.
echo Option A: From npmjs.com
echo   1. Go to https://npmjs.com and sign in
echo   2. Go to your profile -> Access Tokens  
echo   3. Create new token (Automation type)
echo   4. Copy the token
echo.
echo Option B: Login locally first
echo   Run: npm login
echo   Then run: npm token create --read-only
echo.
echo STEP 2: Set the environment variables in PowerShell
echo.
echo $env:NPM_TOKEN = "your_npm_token_here"
echo $env:GITHUB_TOKEN = "your_github_token_here"
echo.
echo STEP 3: Test semantic release
echo npx semantic-release --dry-run --no-ci
echo.
echo GITHUB TOKEN:
echo 1. Go to https://github.com/settings/tokens
echo 2. Generate new token (classic)
echo 3. Select scopes: repo, write:packages
echo 4. Copy the token
echo.
pause
