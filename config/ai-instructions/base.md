# Instruções para escrever um post de blog

Você vai escrever um post para um blog técnico. O resultado é um arquivo Markdown que vai ser colado no editor do blog.

## Como entregar

Responda só com o arquivo, dentro de um único bloco cercado por **quatro crases** e marcado como `md`. Nada de texto antes ou depois.

`````text
````md
---
title: "..."
---

Um parágrafo.

```ts [arquivo.ts]
const exemplo = true;
```

Outro parágrafo.

```bash
npm run dev
```
````
`````

- O bloco de fora usa quatro crases para que os blocos de código do post, que usam três, não fechem ele antes da hora.
- Feche cada bloco de código com ``` sozinho numa linha antes de voltar ao texto. Dois blocos com um parágrafo no meio são dois blocos, cada um com a sua abertura e o seu fechamento.
- Nunca use quatro crases dentro do post.
- Se a sua interface permitir, entregue também como arquivo `.md` para baixar.

## Antes de começar: instale a skill humanizer

O texto precisa seguir a skill **humanizer**, que remove os sinais de texto escrito por IA: https://github.com/blader/humanizer

Se você roda num agente com suporte a skills, instale antes de escrever:

- Claude Code: `/plugin marketplace add blader/humanizer` e depois `/plugin install humanizer@humanizer`
- Codex: `npx skills add blader/humanizer --global --agent codex`
- Claude.ai ou Claude Desktop: baixe o repositório como ZIP (Code → Download ZIP) e envie como skill em Settings
- Outros agentes (Gemini CLI, GitHub Copilot, Windsurf...): `npx skills add blader/humanizer --global --agent '*'`

Escreva o post e depois passe o texto pela skill (`/humanizer`). Se não der para instalar, siga as "Regras de escrita" deste documento, que resumem a skill para pt-BR.

## Formato do arquivo

O arquivo começa com um frontmatter:

```md
---
title: "Título em sentence case, sem ponto final"
description: "Uma ou duas frases, até 160 caracteres. Aparece no Google e nas prévias de link."
date: "AAAA-MM-DD"
tags: [nitro, backend]
---
```

- `tags`: de 2 a 5, em minúsculas, sem acento e sem espaço (use hífen).
- Não escreva `# Título` no corpo. O título já vem do frontmatter.
- Logo depois do frontmatter, um TL;DR com 3 a 5 tópicos curtos (formato abaixo).
- Seções com `##` e subseções com `###`. Títulos em sentence case: só a primeira letra maiúscula.

## Elementos que o blog renderiza

**Callout** (caixa com barra colorida). `title` é opcional:

```md
::alert{type="success" title="TL;DR"}
- Primeiro ponto.
- Segundo ponto.
::
```

Tipos: `info` (contexto ou observação), `success` (TL;DR ou dica), `warning` (cuidado) e `error` (erro comum ou algo que não se deve fazer). No máximo um callout por seção, fora o TL;DR.

**Bloco de código** sempre com linguagem e, quando for um arquivo, o caminho entre colchetes:

````md
```ts [server/routes/users/index.get.ts]
export default defineEventHandler(() => {
  return [];
});
```
````

- Linguagens com cor: `ts`, `js`, `json`, `bash`, `vue`, `dockerfile`, `yaml`. Para árvore de pastas ou saída de terminal, use `text`.
- Linhas de até 80 caracteres. Comentários no código em português.
- Código de exemplo precisa funcionar de verdade. Não invente APIs.

**Outros elementos:**

- `código inline` para nomes de arquivo, função, variável, comando e variável de ambiente.
- Tabela GFM para comparações, com células curtas.
- Listas com `-` e `1.`. Checklist com `- [ ]` e `- [x]`.
- Citação com `>` para uma frase que resume uma lição. No máximo uma por post.
- Nota de rodapé com `[^1]` no texto e `[^1]: comentário` no fim, para observações paralelas.
- Links normais em Markdown. Links internos começam com `/`, como `/blog` ou `/#contact-me`.
- Imagem com `![descrição](/images/arquivo.png)`, só se eu fornecer a imagem.
- `---` sozinho numa linha para separar a parte final, se precisar.
- Não use HTML, emojis nem `#` (h1).

{{VOZ}}

## Regras de escrita (humanizer)

Valem para qualquer voz. Se a seção de voz acima contradizer alguma regra deste documento, vale a seção de voz.

- Varie o ritmo: frases curtas misturadas com frases mais longas.
- Detalhe concreto vale mais que frase genérica, dentro do que a voz escolhida permite.
- Títulos em sentence case e sem ponto final.

**Evite estas palavras e construções**

- "Além disso", "Ademais" → "Também" ou corte.
- "crucial", "fundamental", "essencial" como enfeite → corte ou diga o motivo concreto.
- "cenário", "paisagem", "jornada", "marco", "legado", "impacto significativo", "empoderar", "fomentar" → corte ou troque por algo específico.
- "demonstrar" → "mostrar". "otimizar" genérico → o verbo concreto ("caiu de 800 ms para 120 ms").
- "A fim de", "Com o objetivo de" → "Para". "Devido ao fato de que" → "Porque". "No que diz respeito a" → "Sobre".
- "É importante notar que", "Vale ressaltar que" → corte e diga direto.
- Gerúndio decorativo no fim da frase ("..., garantindo que", "..., contribuindo para") → frase nova com verbo simples.
- "Não se trata apenas de X, mas de Y" e "É mais do que X, é Y" → diga direto.
- Grupos de três por hábito ("rápido, seguro e escalável") → use a quantidade real de itens.
- Travessão (—) → vírgula, ponto ou parênteses.
- Negrito em excesso e listas no formato "**Item:** explicação" → texto corrido ou lista simples.
- Atribuição vaga ("especialistas dizem", "estudos mostram") → cite a fonte ou corte.
- Hedge acumulado ("poderia potencialmente") → "pode".
- Frases de chatbot: "Neste artigo, vamos explorar", "Espero que tenha ajudado", "Ótima pergunta".
- Conclusão genérica ("o futuro é promissor", "um passo na direção certa") → feche com um próximo passo concreto ou um link.

## Tema do post

[Descreva aqui o tema, para quem é o post e os pontos que ele precisa cobrir.]
