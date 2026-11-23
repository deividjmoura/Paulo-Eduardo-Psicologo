# Correções — auditoria e ajustes (nov/2026)

Auditoria feita sobre o site publicado (https://paulopsicologo.vercel.app/) e o código
do repositório, em desktop (1440, 1024), tablet (768) e mobile (390, 360), com e sem JS.

## Bugs encontrados e corrigidos

### Fontes e carregamento
- **404 em todas as fontes.** O CSS apontava para `assets/fonts/*.woff2`, pasta que não
  existia; o fallback era a Google Fonts (requisição externa bloqueada em vários cenários).
  Agora as fontes (Bricolage Grotesque, Instrument Serif e Figtree) são autohospedadas em
  `assets/fonts/`, com `preload` das usadas acima da dobra e `font-display: swap`.
- **Conteúdo invisível sem JavaScript.** O estado inicial de `.reveal` (`opacity: 0`) era
  aplicado sempre. Passou a depender de `html.js`, com uma rede de segurança que revela o
  conteúdo caso o módulo principal não carregue.

### Layout e composição
- **Hero desalinhado.** O padding lateral do texto usava `100%` da coluna do grid em vez da
  viewport, então em telas largas o texto começava na borda (28px) enquanto o resto da
  página respeitava o container (100px). O hero foi reconstruído com um container real.
- **Hero mais alto que a tela.** `min-height: 100vh` somado ao padding do topo empurrava a
  faixa de informações para fora da dobra e cortava a foto. Altura agora considera o nav e
  a foto fica contida no arco.
- **Foto do hero esticada/cortada.** A imagem é 600×600, mas o HTML declarava 600×800.
  Dimensões corrigidas, `object-fit`/`object-position` ajustados e um leve degradê na base
  integra a foto ao fundo.
- **Seções com metade vazia.** Valores estava limitado a 48rem (sobravam ~470px); o bento
  de Atendimento não aproveitava a grade; o carrossel deixava ~370px vazios no desktop.
  Agora: acordeão em largura total, bento 6+6/6+6, carrossel 3-up ocupando o container.
- **Seção Público sem hierarquia.** Título, tabs e painel ficavam empilhados à esquerda.
  Virou layout em duas colunas com as tabs como controle segmentado e painel em cartão.
- **Âncoras com folga dupla.** `scroll-margin-top` do `.section` somava ao
  `scroll-padding-top` do `html` (156px). Agora o destino fica 84px abaixo do topo, exato
  para o nav.

### Navegação mobile
- **Menu ilegível e cortado.** O painel era `display:flex` sobrepondo o atributo `hidden`
  (links continuavam na árvore de acessibilidade), o texto do menu ficava até 200px fora da
  tela e o botão de fechar/brand ficavam creme sobre creme.
  Refeito: overlay escuro de tela cheia, links numerados, CTA e CRP no rodapé, rolagem
  interna quando necessário, `inert` quando fechado, trava de scroll, foco inicial no
  primeiro link, Tab preso no menu e Esc devolvendo o foco ao botão.
- **Ícone do menu invisível.** O burger usava `currentColor` herdado do body (tinta escura
  sobre floresta). Cores do nav agora são explícitas em cada estado (topo, com scroll, menu
  aberto).

### Componentes
- **Foco roubado no carregamento.** `initTabs()` chamava `activate(0)` com foco, deixando um
  anel de foco em "Adolescentes" ao abrir a página. A sincronização inicial não foca mais.
- **Linha da abordagem cortada.** O SVG do caminho tinha altura intrínseca de 400px em vez
  de acompanhar os passos. Corrigido com `height: 100%`; a linha agora desenha do primeiro
  ao último passo, com marcadores alinhados.
- **Imagens dos posts cortadas.** Miniaturas 4:5 com `cover` cortavam o texto das artes
  (548×587). Passaram a ser quadradas com `contain` sobre fundo escuro.
- **Setas do carrossel.** Sem estado desabilitado, visíveis quando não havia overflow e
  arrastando 16px da gutter por causa do snap. Agora há cálculo de overflow, estados
  disabled, gutter preservada (`scroll-padding-inline`) e atualização após o carregamento
  dos posts.
- **Conteúdo do acordeão ainda acessível fechado.** Painéis fechados agora ficam `inert`,
  alinhados ao `aria-expanded`/`aria-controls`.

### Acessibilidade e semântica
- `aria-current` era aplicado como atributo vazio (`aria-current=""`) e o CSS esperava
  `"true"`; agora o link da seção visível recebe `aria-current="true"`.
- Skip link funcional (`main[tabindex="-1"]`), foco visível com cor adequada em fundos claros
  e escuros, alvos de toque de 44px, `prefers-reduced-motion` respeitado.
- Estrutura de rodapé e contato com landmarks, listas e rótulos; ícones decorativos
  `aria-hidden`.

### Performance, SEO e arquivos
- **Imagens:** PNGs de 410/372/123 KB viraram WebP de 29/30/5 KB (−93%); hero WebP 21 KB
  com fallback JPG e `width`/`height` corretos (menos CLS).
- **Favicon:** SVG de 142 KB substituído por marca de 490 bytes + `apple-touch-icon`.
- **HTML:** removidas as requisições à Google Fonts; `<noscript>` esconde botões que
  dependem de JS.
- **SEO:** Open Graph/Twitter completos, `og:image` com dimensões, JSON-LD com e-mail,
  `sitemap.xml` com `lastmod`.
- **Código morto:** removidos `effects.js`, `nav.js`, `fab.js`, `posts-data.js` e `social.js`
  (versões antigas, não referenciadas, com classes inexistentes).

## Verificações executadas

- 45 checagens automatizadas em Chromium: fontes, imagens, overflow horizontal, 5 larguras,
  menu mobile (abrir/fechar/trap/Esc/scroll), acordeão, tabs, carrossel, FAB, âncoras,
  `aria-current`, sem erros de console/rede.
- Sem JS: conteúdo visível.
- `prefers-reduced-motion`: animações desligadas e conteúdo visível.

---

## Rodada 2 — conteúdo sempre visível e mobile refeito (nov/2026)

Depois do deploy da rodada 1 o cliente reportou que o mobile seguia "quebrado" e pediu que
nenhuma informação dependesse de clique. O diagnóstico foi duplo: (a) o navegador estava
servindo CSS/JS antigos do cache; (b) os três blocos interativos (acordeão de Valores, tabs
de Público e carrossel de Novidades) escondiam a maior parte do conteúdo.

### O que mudou

- **Zero interação obrigatória.** Acordeão, tabs e carrossel foram removidos do HTML, do CSS
  e do JS. Valores são quatro artigos em grade (2 colunas → 1 no mobile), Público são dois
  cartões (15+ e 18+) e Novidades são três cartões com imagem, rede e texto — todos legíveis
  de imediato, sem clique e sem JavaScript.
- **Cache-busting.** Todas as referências de CSS, JS, fontes e imagens passaram a levar
  `?v=20261123b`; `vercel.json` mantém cache longo para assets versionados. Isso garante que
  a próxima visita já carregue o layout novo.
- **Hero mobile recomposto.** Até 900px: foto 260px (190px abaixo de 520px, 170px em telas
  baixas), texto em uma coluna e faixa de informações em três colunas com divisórias. Tipografia
  do título reduzida de forma fluida; nenhum elemento maior que a viewport.
- **Bento de Atendimento** com cartões de altura automática no mobile (antes a altura mínima
  fixa deixava buracos) e padding proporcional.
- **Novidades em lista.** No mobile cada post virou uma linha com miniatura quadrada alinhada
  ao texto; no desktop, três colunas com imagem 1:1.
- **Detalhes de acabamento.** `.reveal` com rede de segurança também para rolagem rápida/âncoras
  (nada fica invisível ao pular direto para uma seção); FAB escondido no hero, no contato e no
  rodapé; alvos de toque de 40px nos links de contato; escala mínima de texto em 12.8px; anel
  decorativo do Propósito animado só em opacidade (sem costura de rasterização); post sem
  imagens cortadas (`cover` + miniatura quadrada) e ícone do Facebook redesenhado.

### Verificações executadas (rodada 2)

- 176 checagens automatizadas em Chromium, 14 larguras (320 → 1920): overflow horizontal,
  vazamento de elementos, texto cortado, alvos de toque, fontes, imagens, âncoras, links
  externos, console e rede sem erros.
- Visibilidade sem clique de cada bloco: 4 valores, 2 públicos, 3 posts, 4 passos da TCC.
- Sem JS e com `prefers-reduced-motion`: todo o conteúdo visível.
- Screenshots revisados em 320, 390, 768, 1440 e 1920.
