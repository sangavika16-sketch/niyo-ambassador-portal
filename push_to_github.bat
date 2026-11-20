@echo off
title Push Niyo Ambassador Portal to GitHub
echo ========================================================
echo   Pushing to GitHub: sangavika16-sketch/niyo-ambassador-portal
echo ========================================================
echo.

:: Add Git, Git Credential Manager, and Node to PATH
set "PATH=C:\Program Files\Git\cmd;C:\Program Files\Git\ucrt64\bin;C:\Program Files\Git\bin;C:\Program Files\nodejs;%PATH%"

echo Checking Git installation...
git --version
if %errorlevel% neq 0 (
    echo Error: Git was not found. Please check Git installation.
    pause
    exit /b 1
)

echo.
echo Current branch:
git branch --show-current
echo.

echo Current remote URL:
git remote get-url origin
echo.

echo ========================================================
echo   ATTEMPTING PUSH TO GITHUB...
echo ========================================================
echo.
echo If a browser window pops up, click "Authorize git-ecosystem" or sign in.
echo If it asks for credentials in this window, follow the prompts.
echo.

git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================================
    echo   SUCCESS! ALL FILES PUSHED TO GITHUB!
    echo   View your repository at:
    echo   https://github.com/sangavika16-sketch/niyo-ambassador-portal
    echo ========================================================
) else (
    echo.
    echo ========================================================
    echo   Push did not complete automatically.
    echo   Let's use a Personal Access Token:
    echo ========================================================
    echo.
    echo 1. Go to: https://github.com/settings/tokens/new in your browser
    echo 2. Check the "repo" box and click "Generate token"
    echo 3. Copy the token (starts with ghp_...)
    echo.
    set /p GITHUB_TOKEN="Paste your GitHub Token here and press Enter: "
    if defined GITHUB_TOKEN (
        echo.
        echo Pushing using your token...
        git push https://sangavika16-sketch:%GITHUB_TOKEN%@github.com/sangavika16-sketch/niyo-ambassador-portal.git main -u
        if %errorlevel% equ 0 (
            echo.
            echo SUCCESS! Code pushed to GitHub!
        )
    )
)

echo.
echo Press any key to close this window.
pause >nul
