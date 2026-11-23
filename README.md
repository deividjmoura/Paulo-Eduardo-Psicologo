# Paulo Eduardo T. Cosentino — Site profissional

Psicólogo clínico (CRP 12/30514) · Itajaí/SC · TCC presencial e online.

## Redesign Respiro

Identidade editorial e calma. Paleta original preservada. Tipografia: Bricolage Grotesque, Instrument Serif, Figtree (autohospedadas em `assets/fonts/`).

### Estrutura

```
index.html
assets/css/   tokens | base | layout | components | sections | motion
assets/js/    main.js + modules/
assets/fonts/ woff2
assets/img/
data/posts.json
docs/redesign-notes.md
```

### Desenvolvimento local

Abra `index.html` via servidor estático (módulos ES exigem HTTP):

```bash
npx serve .
# ou
python3 -m http.server 8080
```

### Atualizar posts

Edite `data/posts.json` (id, rede, imagem, legenda, data, url). Imagens em `assets/img/`.

### Deploy

Vercel a partir do repositório GitHub. Preview em PRs.

### Acessibilidade e movimento

`prefers-reduced-motion` desativa anéis, reveals e desenho da linha. Conteúdo visível sem JS.
