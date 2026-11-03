---
title: "Rascunho de exemplo"
description: "Um post de teste para ver como cada elemento aparece no blog."
date: "2026-11-03"
tags: [exemplo, markdown]
---

::alert{type="success" title="TL;DR"}
- Escreva no editor e veja o post do jeito que vai ficar no blog.
- O rascunho fica salvo neste navegador.
- "Copiar instruções para IA" leva o formato e o estilo para qualquer IA.
::

Este é um parágrafo com **negrito**, *itálico*, ~~riscado~~, `código inline` e um [link](/blog).

## Um título de seção

Lista com tópicos:

- Primeiro item
- Segundo item
  - Item dentro do segundo

E uma lista numerada:

1. Instale as dependências
2. Rode o projeto

::alert{type="warning" title="Cuidado"}
Callouts aceitam `info`, `success`, `warning` e `error`.
::

### Código

```ts [server/routes/hello.get.ts]
export default defineEventHandler(() => {
  return { message: "Olá!" };
});
```

| Elemento | Sintaxe |
| -------- | ------- |
| Callout  | `::alert{type="info"}` |
| Código   | `` ```ts [arquivo.ts] `` |

- [x] Escrever o rascunho
- [ ] Revisar com a skill humanizer

> Uma frase que resume a lição do post.

Uma nota de rodapé fica assim[^1].

[^1]: E o texto dela aparece no fim do post.
