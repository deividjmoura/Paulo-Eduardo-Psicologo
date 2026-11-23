# Redesign Respiro — notas de auditoria

## Fonte da verdade
- Site publicado: https://paulopsicologo.vercel.app/
- Repositório: deividjmoura/Paulo-Eduardo-Psicologo (main)
- Paleta extraída de `assets/css/tokens.css` local (prevalece sobre o prompt)

## Tokens de cor mantidos
| Token | Hex | Uso |
|-------|-----|-----|
| --floresta | #0e2b22 | fundos escuros, nav over dark |
| --verde | #1f6a4a | primário, CTAs, acentos |
| --salvia | #a8d5ba | destaque claro, foco |
| --musgo | #2f5d49 | blocos intermediários |
| --areia | #e2dac6 | superfícies secundárias |
| --areia-2 | #d6cdb6 | variação areia |
| --papel | #ece6d6 | fundo principal (creme) |
| --tinta | #16231d | texto |
| --suave | #4f5d55 | texto secundário |

## Removido (linguagem visual anterior)
- Fraunces + Hanken Grotesk
- Selo circular / logo girando / textPath
- Marquee de palavras
- Vídeo na seção Valores
- Cards com hover de expansão / luz
- Botões pílula com onda
- Sticky split Valores (versão anterior)
- Blob / grain overlays

## Mantido
- Conteúdo textual, CRP, links WhatsApp/IG/FB
- Foto paulo.jpg / paulo.webp
- FAB único de contato
- Posts estáticos (sem API)
- Paleta acima

## Conceito
**Respiro** — editorial, calmo, humano. Movimento lento (respiração). Formas em arco. Tipografia Bricolage + Instrument Serif + Figtree.

## Ajustes de implementação (nov/2026)
- Fontes passaram a ser autohospedadas (`assets/fonts/`) — as referências anteriores retornavam 404.
- Hero, Valores, Atendimento, Público, Abordagem, Novidades e Contato foram recompostos para
  ocupar o container sem áreas mortas; menu mobile e estados de foco foram refeitos.
- Auditoria detalhada em `docs/correcoes.md`.
