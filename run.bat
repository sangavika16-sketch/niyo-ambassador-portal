@echo off
echo ========================================================
echo   Starting Niyo Student Ambassador Workbench...
echo ========================================================
echo.

:: Ensure Node.js is in PATH if not already
set "PATH=C:\Program Files\nodejs;%PATH%"

echo Checking Node.js installation...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js was not found. Please ensure Node.js is installed.
    pause
    exit /b 1
)

echo Node.js is active.
echo Starting local development server...
echo.
echo The website will be available at: http://localhost:5173
echo Press Ctrl+C in this terminal window to stop the server anytime.
echo.

start http://localhost:5173
npm run dev

pause
