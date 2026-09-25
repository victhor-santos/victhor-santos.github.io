# Victhor Santos — Portfólio

Portfólio estático em português, com layout responsivo, navegação por teclado e respeito à preferência de redução de movimento. HTML, CSS e JavaScript sem dependências de instalação. As fontes do Google Fonts possuem alternativas locais.

## Visualizar

Com Node.js instalado, execute `node server.mjs` nesta pasta e abra http://127.0.0.1:4173.

## Personalizar

- `dist/index.html`: apresentação, projetos e contatos.
- `dist/styles.css`: identidade visual e adaptação para celular.
- `dist/script.js`: ano do rodapé.

Os três projetos foram selecionados pela data de criação dos repositórios públicos em 24/09/2026. O conteúdo é estático: novos repositórios não substituem automaticamente a seleção.

## Hospedar gratuitamente no GitHub Pages

1. Crie um repositório público chamado `victhor-santos.github.io` para usar o endereço principal do perfil, ou `portfolio` para usar um subdiretório.
2. Envie o conteúdo desta pasta, incluindo `.github/workflows/pages.yml` e `dist`.
3. Em **Settings → Pages → Build and deployment**, selecione **GitHub Actions**.
4. Execute o workflow **Publicar portfólio no GitHub Pages** na aba **Actions**, ou envie um commit para `main`.

O workflow publica somente `dist`. Os links relativos são compatíveis com os dois formatos de endereço. Nunca envie credenciais ou tokens para o repositório.

Documentação: https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
