@echo off
title BOT
cls
:bot
node index.js
msg * %username% Félicitation le bot a été lancé!
echo.
echo Reconnexion...
goto bot
