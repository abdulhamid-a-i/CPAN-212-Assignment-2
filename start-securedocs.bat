@echo off

echo ==========================================
echo NSM Application Startup
echo ==========================================

echo.

REM Check if MongoDB is running
echo Checking MongoDB connection...
netstat -ano | findstr :27017 >nul

IF %ERRORLEVEL% NEQ 0 (
    echo MongoDB does not appear to be running.
    echo Please start MongoDB before running this application.
    pause
    exit /b
)

echo MongoDB detected.

echo.

REM Start Backend
echo Starting NSM Backend...

cd backend

IF NOT EXIST node_modules (
    echo Installing backend dependencies...
    call npm install
)

start cmd /k "npm run dev"

cd ..

echo Backend started.

timeout /t 4 >nul

echo.

REM Start Frontend
echo Starting NSM Angular Frontend...

cd frontend

IF NOT EXIST node_modules (
    echo Installing frontend dependencies...
    call npm install
)

start cmd /k "npm start"

cd ..

timeout /t 6 >nul

echo.

echo Opening application in browser...
start http://localhost:4200

echo.

echo ==========================================
echo NSM started successfully
echo Backend:  http://localhost:3000
echo Frontend: http://localhost:4200
echo ==========================================

pause