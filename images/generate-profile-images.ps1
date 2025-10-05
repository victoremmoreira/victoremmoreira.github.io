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
  [string]$Source = "profile-original.jpg",
  [switch]$Force
)

# Diretório onde este script está localizado (garante caminhos corretos se chamado a partir de outra pasta)
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition

# Se o caminho de source não for absoluto, tente resolver em relação ao diretório do script
if (-not [System.IO.Path]::IsPathRooted($Source)) {
  # Tenta localizar apenas pelo nome do arquivo no diretório do script
  $leaf = Split-Path -Leaf $Source
  $possible = Join-Path $ScriptDir $leaf
  if (Test-Path $possible) {
    $InputPath = $possible
  } else {
    # fallback: caminho relativo ao script
    $InputPath = Join-Path $ScriptDir $Source
  }
} else {
  $InputPath = $Source
}

Write-Host "[info] Script dir: $ScriptDir"
Write-Host "[info] Source argument resolved to: $InputPath"

function Write-Info($msg){ Write-Host "[info] $msg" -ForegroundColor Cyan }
function Write-ErrorAndExit($msg){ Write-Host "[error] $msg" -ForegroundColor Red; exit 1 }

# Verifica input
if (-not (Test-Path $InputPath)) {
  Write-ErrorAndExit "Arquivo de entrada não encontrado: $InputPath`nColoque a foto original (a que você me enviou) em '$InputPath' ou passe -Source 'caminho'"
}

# Verifica magick
$magick = Get-Command magick -ErrorAction SilentlyContinue
if (-not $magick) {
    Write-ErrorAndExit "O comando 'magick' (ImageMagick) não foi encontrado no PATH. Instale ImageMagick: https://imagemagick.org"
}

# Cria pasta images se não existir
$dir = Split-Path -Parent $Input
if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir | Out-Null }

# Define saídas (paths absolutos relativos ao diretório do script)
$out144jpg = Join-Path $ScriptDir "profile-144.jpg"
$out288jpg = Join-Path $ScriptDir "profile-288.jpg"
$out144webp = Join-Path $ScriptDir "profile-144.webp"
$out288webp = Join-Path $ScriptDir "profile-288.webp"

# Função para rodar magick com checagem
function Run-Magick($resize, $quality, $outFile) {
  if ((Test-Path $outFile) -and (-not $Force)) {
    $resp = Read-Host "Arquivo $outFile já existe. Substituir? (S/N)"
    if ($resp -ne 'S' -and $resp -ne 's') { Write-Info "Pular: $outFile"; return }
  }
  Write-Info "Gerando $outFile"
  # Chamar magick passando cada argumento separadamente para evitar problemas de parsing
  # Usa a sintaxe: magick convert <input> -resize 288x288> -quality 85 <output>
  # Chamar magick diretamente (IM v7) sem subcomando 'convert' para evitar avisos
  $argsList = @($InputPath, '-resize', $resize, '-quality', $quality, $outFile)
  Write-Info ("Running: magick " + ($argsList -join ' '))
  & magick @argsList
  if ($LASTEXITCODE -ne 0) { Write-ErrorAndExit "Falha ao gerar $outFile" }
}



# Gera JPG 288
Run-Magick '288x288>' 85 $out288jpg

# Gera JPG 144
Run-Magick '144x144>' 85 $out144jpg

# Gera WebP 288
Run-Magick '288x288>' 80 $out288webp

# Gera WebP 144
Run-Magick '144x144>' 80 $out144webp

Write-Info "Concluído. Arquivos gerados (ou existentes):"
$generated = @($out144jpg,$out288jpg,$out144webp,$out288webp) | Where-Object { Test-Path $_ }
if ($generated.Count -eq 0) {
  Write-Host "Nenhum arquivo gerado encontrado. Verifique mensagens acima." -ForegroundColor Yellow
} else {
  $generated | ForEach-Object { $f = Get-Item $_; Write-Host " - $($f.FullName) ($([math]::Round($f.Length/1024,1)) KB)" }
}

Write-Host "\nDica: abra index.html e, se desejado, descomente a linha de preload para melhorar LCP." -ForegroundColor Green
