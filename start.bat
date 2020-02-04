@echo off
title modules
cls
:bot
node index.js
msg * %username% Félicitation le bot a été lancé!
echo.
echo Reconnexion...
goto bot
