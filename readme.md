# Steps to deploy

- Execute the command `npm run predeploy`
- Add `<link rel="manifest" href="/manifest.json" />` in head tag of file `dist/index.html`
- Copy images of `back-icon` to `dist/assets/assets/images`
- Change value of `httpServerLocation` from `back-icon` to `/assets/assets/images`
- Copy file `MaterialCommunityIcons.ttf` to `dist/assets/assets`
- Change value of `httpServerLocation` from `MaterialCommunityIcons` to `/assets/assets`

# TODO

- Incluir slide das imagens para trocar de imagem
- Colocar zoom nas imagens
- Transferir dados para BD do firebase
- Criar tela para requisitos do Exame de Faixa
