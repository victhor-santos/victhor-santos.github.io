# Victhor Santos — AI Engineering Portfolio

Portfólio profissional de Victhor Santos, estudante de Engenharia de Software focado em AI Engineering. O site apresenta a evolução de fundamentos em Java e back-end para sistemas que integram Python e Machine Learning a aplicações reais.

O projeto é estático, responsivo, navegável por teclado e respeita a preferência de redução de movimento. Usa HTML, CSS e JavaScript sem dependências de instalação.

## Visualizar

Com Node.js instalado, execute `node server.mjs` nesta pasta e abra http://127.0.0.1:4173.

## Personalizar

- `dist/index.html`: apresentação, retrato sem fundo e trajetória em cinco capítulos.
- `dist/projetos.html`: projetos, carrosséis e diagramas.
- `dist/experience.css` e `dist/experience.js`: apresentação, leitura guiada e controles de movimento.
- `dist/penguin.js`: pinguim 3D procedural, usando Three.js local (MIT).
- `dist/tech-icons.css` e `dist/assets/tech/`: ícones animados com nomes acessíveis; fontes e licenças em `ATTRIBUTION.md`.
- `dist/styles.css`: identidade visual e adaptação para celular.
- `dist/script.js`: cards clicáveis, carrosséis, ampliação de diagramas e ano do rodapé.
- `scripts/generate-diagrams.mjs`: gera os diagramas SVG; execute com `node scripts/generate-diagrams.mjs`.

O projeto principal distingue a base Java implementada da integração de Route Intelligence planejada. Python/ML são parte da direção de estudos e evolução da plataforma, sem apresentar a integração como concluída.

Os três projetos foram selecionados pela data de criação dos repositórios públicos em 24/09/2026. O conteúdo é estático: novos repositórios não substituem automaticamente a seleção.

## Hospedar gratuitamente no GitHub Pages

1. Crie um repositório público chamado `victhor-santos.github.io` para usar o endereço principal do perfil, ou `portfolio` para usar um subdiretório.
2. Envie o conteúdo desta pasta, incluindo `.github/workflows/pages.yml` e `dist`.
3. Em **Settings → Pages → Build and deployment**, selecione **GitHub Actions**.
4. Execute o workflow **Publicar portfólio no GitHub Pages** na aba **Actions**, ou envie um commit para `main`.

O workflow publica somente `dist`. Os links relativos são compatíveis com os dois formatos de endereço. Nunca envie credenciais ou tokens para o repositório.

Documentação: https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages

## Apresentação e acessibilidade

O pinguim apresenta textos predefinidos baseados na trajetória fornecida pelo autor; não utiliza uma API de IA. A leitura acompanha os capítulos e também pode ser controlada pelas setas. As animações respeitam `prefers-reduced-motion`, têm botão de pausa e o 3D suspende a renderização fora de vista. O retrato original foi fornecido pelo autor; o recorte transparente está em `dist/assets/victhor-cutout.png`.

O recorte foi produzido pela ferramenta integrada de imagem com a instrução: remover somente o fundo do carro, preservando pessoa, rosto, expressão, cabelo, roupa e aparência fotográfica, com fundo transparente e sem retoques ou elementos novos.
