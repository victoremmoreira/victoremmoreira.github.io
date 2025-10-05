@echo off
REM run-generate-images.cmd
REM Clique duplo neste arquivo para gerar as imagens de perfil (usa PowerShell com ExecutionPolicy Bypass).

SETLOCAL

REM Diretório deste arquivo (deve ser a pasta images) - %~dp0 termina com backslash
SET "SCRIPT_DIR=%~dp0"
SET "PS_SCRIPT=%SCRIPT_DIR%generate-profile-images.ps1"

echo -------------------------------------------------
echo Gerador de imagens de perfil - iniciando
echo -------------------------------------------------

nIF NOT EXIST "%PS_SCRIPT%" (
    echo ERRO: Script não encontrado: "%PS_SCRIPT%"
    echo -> Verifique se este arquivo está na pasta 'images' e se 'generate-profile-images.ps1' existe.
    pause
    exit /b 1
)

necho Executando: powershell -NoProfile -ExecutionPolicy Bypass -File "%PS_SCRIPT%" -Force

nREM Executa o script PowerShell e aguarda a conclusão. A opção -Force passa ao script para não perguntar sobre sobrescrita.
powershell -NoProfile -ExecutionPolicy Bypass -File "%PS_SCRIPT%" -Force
n
nset "RC=%ERRORLEVEL%"
necho -------------------------------------------------
necho Concluido com codigo de saida: %RC%
necho -------------------------------------------------
pause
ENDLOCAL
exit /b %RC%
