@echo off
REM Storybook Fix and Management Script for Windows
REM This script fixes common Storybook issues and provides management commands

echo 🔧 Storybook Fix and Management Script
echo ======================================

REM Function to check if Storybook is running
:check_storybook
tasklist /FI "IMAGENAME eq node.exe" /FI "WINDOWTITLE eq storybook*" 2>NUL | find /I "node.exe" >NUL
if %ERRORLEVEL% EQU 0 (
    echo ✅ Storybook is running
    goto :eof
) else (
    echo ❌ Storybook is not running
    goto :eof
)

REM Function to start Storybook
:start_storybook
echo 🚀 Starting Storybook...
start /B npm run storybook
timeout /t 5 /nobreak >NUL
call :check_storybook
if %ERRORLEVEL% EQU 0 (
    echo ✅ Storybook started successfully
    echo 📖 Access at: http://localhost:6006/
) else (
    echo ❌ Failed to start Storybook
    exit /b 1
)
goto :eof

REM Function to stop Storybook
:stop_storybook
echo 🛑 Stopping Storybook...
taskkill /F /FI "WINDOWTITLE eq storybook*" /T >NUL 2>&1
taskkill /F /FI "IMAGENAME eq node.exe" /FI "WINDOWTITLE eq *storybook*" >NUL 2>&1
timeout /t 2 /nobreak >NUL
call :check_storybook
if %ERRORLEVEL% NEQ 0 (
    echo ✅ Storybook stopped successfully
) else (
    echo ❌ Failed to stop Storybook
)
goto :eof

REM Function to clean Storybook cache
:clean_storybook
echo 🧹 Cleaning Storybook cache...
if exist "node_modules\.cache\storybook" rmdir /s /q "node_modules\.cache\storybook"
if exist ".storybook-out" rmdir /s /q ".storybook-out"
echo ✅ Storybook cache cleaned
goto :eof

REM Function to fix common issues
:fix_storybook
echo 🔧 Fixing common Storybook issues...

REM Remove conflicting preview files
if exist ".storybook\preview.ts" if exist ".storybook\preview.tsx" (
    echo 📝 Removing conflicting preview.ts file...
    del ".storybook\preview.ts"
)

REM Clean cache
call :clean_storybook

echo ✅ Common issues fixed
goto :eof

REM Main script logic
if "%1"=="start" goto start_storybook
if "%1"=="stop" goto stop_storybook
if "%1"=="restart" (
    call :stop_storybook
    timeout /t 2 /nobreak >NUL
    call :start_storybook
    goto :eof
)
if "%1"=="status" goto check_storybook
if "%1"=="clean" goto clean_storybook
if "%1"=="fix" goto fix_storybook
if "%1"=="dev" (
    call :fix_storybook
    call :start_storybook
    goto :eof
)

REM Show usage
echo Usage: %0 {start^|stop^|restart^|status^|clean^|fix^|dev}
echo.
echo Commands:
echo   start   - Start Storybook
echo   stop    - Stop Storybook
echo   restart - Restart Storybook
echo   status  - Check if Storybook is running
echo   clean   - Clean Storybook cache
echo   fix     - Fix common Storybook issues
echo   dev     - Fix issues and start Storybook (recommended)
exit /b 1
