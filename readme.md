# Steps to deploy

- Execute the command `npm run predeploy`
- Add `<link rel="manifest" href="/manifest.json" />` in head tag of file `dist/index.html`
- Copy images of `back-icon` to `dist/assets/assets/images`
- Change value of `httpServerLocation` from `back-icon` to `/assets/assets/images`
- Copy file `MaterialCommunityIcons.ttf` to `dist/assets/assets`
- Change value of `httpServerLocation` from `MaterialCommunityIcons` to `/assets/assets`

# TODO

- Na tela de Imagens, deixar o cabeçalho preto, pois no tema branco está estranho
- Nos katas deixar o título sempre branco, pois no tema branco a título preto se mescla com o fundo
- Incluir slide das imagens para trocar de imagem
- Colocar zoom nas imagens
- Transferir dados para BD do firebase
