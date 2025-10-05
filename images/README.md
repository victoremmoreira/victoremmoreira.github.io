Coloque suas imagens de perfil otimizadas nesta pasta

Instruções rápidas

1) Salve a foto original (a que você me enviou) como:
   - profile-original.jpg

2) Gere as versões recomendadas usando ImageMagick (instale em https://imagemagick.org):

   Abra o PowerShell e rode:

   magick convert images\profile-original.jpg -resize 288x288^> -quality 85 images\profile-288.jpg
   magick convert images\profile-original.jpg -resize 144x144^> -quality 85 images\profile-144.jpg

   magick convert images\profile-original.jpg -resize 288x288^> -quality 80 images\profile-288.webp
   magick convert images\profile-original.jpg -resize 144x144^> -quality 80 images\profile-144.webp

   Observações:
   - Os nomes devem coincidir com os referenciados em `index.html`.
   - Ajuste a qualidade (-quality) se quiser arquivos menores.

3) Após gerar os arquivos, abra `index.html` e (opcionalmente) descomente a linha de <link rel="preload"> para melhorar LCP.

Alternativa: use serviços de CDN de imagens (Cloudinary, Imgix) para gerar variantes automaticamente se preferir não armazenar os arquivos locais.
