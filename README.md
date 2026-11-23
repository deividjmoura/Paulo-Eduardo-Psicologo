# Paulo Eduardo T. Cosentino — Site profissional

Psicólogo clínico (CRP 12/30514) · Itajaí/SC · TCC presencial e online.

## Redesign Respiro

Identidade editorial e calma. Paleta original preservada. Tipografia: Bricolage Grotesque,
Instrument Serif e Figtree, autohospedadas em `assets/fonts/` (Fontsource, subset latin).
Sem requisições a fontes externas.

### Estrutura

```
index.html
assets/css/   tokens | base | layout | components | sections | motion
assets/js/    main.js + modules/
assets/fonts/ woff2 (Bricolage, Instrument Serif, Figtree)
assets/img/   retrato (webp + jpg) e miniaturas das publicações (webp)
data/posts.json
docs/redesign-notes.md
docs/correcoes.md
```

### Desenvolvimento local

Abra `index.html` via servidor estático (módulos ES exigem HTTP):

```bash
npx serve .
# ou
python3 -m http.server 8080
```

### Atualizar posts

Edite `data/posts.json` (id, rede, imagem, legenda, url). Prefira WebP em `assets/img/`.
Os cards estáticos do `index.html` servem de fallback caso o JSON não carregue.

### Deploy

Vercel a partir do repositório GitHub. Preview em PRs.

### Acessibilidade e movimento

`prefers-reduced-motion` desativa anéis, reveals e desenho da linha. Conteúdo visível sem
JS. Menu mobile com `inert`, foco preso e Esc. Alvos de toque de 44px.

Não há conteúdo escondido atrás de clique: valores, públicos e publicações ficam todos
abertos na página. Ao alterar CSS, JS, fontes ou imagens, atualize o `?v=` das referências
no `index.html` (e em `base.css`/`posts.json`) para furar o cache.

### Correções

O histórico da auditoria e dos bugs corrigidos está em [`docs/correcoes.md`](docs/correcoes.md).
