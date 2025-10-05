<#
PowerShell script para gerar imagens otimizadas de perfil a partir de um arquivo original.

Uso:
  1) Coloque seu arquivo original em images\profile-original.jpg (ou passe um caminho para -Input).
  2) Abra PowerShell e execute (com permissões adequadas):
       .\images\generate-profile-images.ps1

Parâmetros:
  -Input  : Caminho para o arquivo de entrada (default: images\profile-original.jpg)
  -Force  : Substitui arquivos de saída sem perguntar

Requisitos:
  - ImageMagick (comando 'magick') disponível no PATH: https://imagemagick.org
  - Opcional: cwebp (do libwebp) para compressão WebP (caso queira usar em vez do magick)
#>

param(
    [string]$Input = "images\profile-original.jpg",
    [switch]$Force
)

function Write-Info($msg){ Write-Host "[info] $msg" -ForegroundColor Cyan }
function Write-ErrorAndExit($msg){ Write-Host "[error] $msg" -ForegroundColor Red; exit 1 }

# Verifica input
if (-not (Test-Path $Input)) {
    Write-ErrorAndExit "Arquivo de entrada não encontrado: $Input`nColoque a foto original (a que você me enviou) em 'images\\profile-original.jpg' ou passe -Input 'caminho'"
}

# Verifica magick
$magick = Get-Command magick -ErrorAction SilentlyContinue
if (-not $magick) {
    Write-ErrorAndExit "O comando 'magick' (ImageMagick) não foi encontrado no PATH. Instale ImageMagick: https://imagemagick.org"
}

# Cria pasta images se não existir
$dir = Split-Path -Parent $Input
if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir | Out-Null }

# Define saídas
$out144jpg = "images\profile-144.jpg"
$out288jpg = "images\profile-288.jpg"
$out144webp = "images\profile-144.webp"
$out288webp = "images\profile-288.webp"

# Função para rodar magick com checagem
function Run-Magick($args, $outFile) {
    if ((Test-Path $outFile) -and (-not $Force)) {
        $resp = Read-Host "Arquivo $outFile já existe. Substituir? (S/N)"
        if ($resp -ne 'S' -and $resp -ne 's') { Write-Info "Pular: $outFile"; return }
    }
    Write-Info "Gerando $outFile"
    $cmd = "magick convert `"$Input`" $args `"$outFile`""
    Write-Info $cmd
    & magick convert $Input $args $outFile
    if ($LASTEXITCODE -ne 0) { Write-ErrorAndExit "Falha ao gerar $outFile" }
}

# Gera JPG 288
Run-Magick "-resize 288x288^> -quality 85" $out288jpg

# Gera JPG 144
Run-Magick "-resize 144x144^> -quality 85" $out144jpg

# Gera WebP 288
Run-Magick "-resize 288x288^> -quality 80" $out288webp

# Gera WebP 144
Run-Magick "-resize 144x144^> -quality 80" $out144webp

Write-Info "Concluído. Arquivos gerados (ou existentes):"
Get-Item $out144jpg,$out288jpg,$out144webp,$out288webp | ForEach-Object { Write-Host " - $($_.FullName) ($([math]::Round($_.Length/1024,1)) KB)" }

Write-Host "\nDica: abra index.html e, se desejado, descomente a linha de preload para melhorar LCP." -ForegroundColor Green
