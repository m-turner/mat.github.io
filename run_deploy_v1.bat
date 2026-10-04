#wrapper to call ps1 that updates website by double clicking
@echo off
powershell -ExecutionPolicy Bypass -File "%~dp0deploy_v1.ps1" %*
pause