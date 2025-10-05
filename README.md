# victoremmoreira.github.io

Seções úteis
-----------

Gerar imagens de perfil otimizadas
---------------------------------

Coloque a foto original que você quer usar como perfil em `images\profile-original.jpg` e execute o script PowerShell para gerar as variantes JPG e WebP usadas pelo site:

PowerShell:

	.\images\generate-profile-images.ps1

O script requer ImageMagick (`magick`) disponível no PATH. Veja `images/README.md` para comandos alternativos e detalhes.