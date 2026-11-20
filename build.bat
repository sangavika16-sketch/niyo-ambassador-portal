@echo off
echo ========================================================
echo   Building Niyo Ambassador Workbench for Production...
echo ========================================================
echo.

set "PATH=C:\Program Files\nodejs;%PATH%"

call npm run build

if %errorlevel% equ 0 (
    echo.
    echo ========================================================
    echo   Build Successful! Production assets created in 'dist/'
    echo ========================================================
) else (
    echo.
    echo Build failed. Please check the error messages above.
)

pause
