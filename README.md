# Paulo Eduardo T. Cosentino · Psicólogo Clínico

Site estático (HTML + CSS + JS puros), sem build. Deploy na Vercel.

## Estrutura
- `index.html`: conteúdo e SEO (Open Graph, JSON-LD)
- `assets/css/`: `tokens.css` (cores/tipografia), `base.css`, `components.css`, `sections.css`
- `assets/js/`: `nav.js`, `effects.js`, `social.js`, `fab.js`
- `assets/js/posts-data.js`: **edite aqui os posts exibidos** (rede, data, texto, url, imagem opcional)
- `assets/img/`: foto, favicon

## Posts do Facebook/Instagram
Sem API, a lista é manual. Copie o link do post, cole em `url` e atualize `texto`/`data`.
Imagem opcional: salve em `assets/img/` e preencha `imagem`.

## Rodar local
`npx serve .` ou abra o `index.html`.

## Commits
Conventional Commits (`feat:`, `fix:`, `style:`, `docs:`, `chore:`).
