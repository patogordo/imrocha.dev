---
title: "APIs escaláveis com Nitro"
description: "Como eu organizo uma API em Nitro para ela crescer sem virar bagunça e aguentar mais tráfego: rotas por arquivo, validação, cache no Redis e deploy em cluster."
date: "2026-11-02"
tags: [nitro, backend, nodejs, typescript]
---

O Nitro é o servidor que roda por baixo do Nuxt, mas dá para usar ele sozinho, sem front nenhum. Uso no back-end do Flaggle Versus e do Easy Finance, e foi a primeira vez que montei uma API em Node sem sentir falta do Express ou do Nest.

Quando falo em API escalável aqui, quero dizer duas coisas. A primeira é aguentar mais tráfego subindo mais instâncias, sem reescrever código. A segunda é o projeto passar de 5 para 50 rotas sem ninguém se perder nele. O Nitro ajuda nas duas, desde que você siga algumas regras que vou mostrar abaixo.

::alert{type="info" title="Versão"}
Os exemplos usam o Nitro 2, que é o que vem com o Nuxt 4. Num projeto Nuxt, tudo funciona igual dentro da pasta `server/`.
::

## Criando o projeto

```bash
npx giget@latest nitro minha-api --install
cd minha-api
npm run dev
```

Eu gosto de deixar o código do servidor numa pasta `server/`, separado da configuração:

```ts [nitro.config.ts]
export default defineNitroConfig({
  srcDir: "server",
  compatibilityDate: "2025-01-01",
});
```

```text
minha-api/
├── nitro.config.ts
└── server/
    ├── routes/      # cada arquivo vira uma rota
    ├── middleware/  # roda antes de toda rota
    ├── plugins/     # roda uma vez, quando o servidor sobe
    └── utils/       # funções importadas automaticamente
```

## Rotas por arquivo

O nome do arquivo define o caminho e o método. Não existe um arquivo central de rotas que vai crescendo até ninguém querer abrir, e isso sozinho já resolve metade da organização.

| Arquivo                     | Rota                                  |
| --------------------------- | ------------------------------------- |
| `routes/index.ts`           | `/` (qualquer método)                 |
| `routes/users/index.get.ts` | `GET /users`                          |
| `routes/users/index.post.ts`| `POST /users`                         |
| `routes/users/[id].get.ts`  | `GET /users/:id`                      |
| `routes/[...path].ts`       | tudo que não bateu com nenhuma rota   |

Um handler é uma função que recebe o `event` e retorna a resposta. Se for um objeto, ele vira JSON sozinho. O `useDb` aparece mais abaixo.

```ts [server/routes/users/[id].get.ts]
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const db = await useDb();
  const user = await db.collection("users").findOne({ id });

  if (!user) {
    throw createError({ statusCode: 404, statusMessage: "Usuário não encontrado" });
  }

  return user;
});
```

## Valide tudo que entra

Body, query e parâmetros vêm de fora e podem ter qualquer coisa. O h3[^1] já tem helpers que recebem um validador, e com o Zod fica assim:

```ts [server/routes/users/index.post.ts]
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().email(),
});

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, schema.parse);
  const db = await useDb();
  await db.collection("users").insertOne({ ...body, createdAt: new Date() });

  setResponseStatus(event, 201);
  return body;
});
```

Se o body não passar no schema, o `readValidatedBody` responde **400** com os erros do Zod e o handler nem roda. O `z.object` ainda descarta campos que não estão no schema, então ninguém consegue mandar um `isAdmin: true` junto. Para query string existe o `getValidatedQuery`, que funciona do mesmo jeito.

::alert{type="warning" title="Cuidado"}
Evite `readBody` sem validação espalhado pelo projeto. Quando a API cresce, fica muito difícil descobrir qual rota aceita um campo que não devia.
::

## Uma conexão por instância

Abrir conexão com o banco a cada requisição é o jeito mais rápido de derrubar o banco quando o tráfego sobe. O certo é abrir uma vez por instância e reaproveitar. Como o Nitro importa sozinho tudo que está em `utils/`, basta uma função:

```ts [server/utils/db.ts]
import { MongoClient } from "mongodb";

let connecting: Promise<MongoClient> | undefined;

export async function useDb() {
  // Guarda a promise, não o client: duas requisições no cold start não abrem duas conexões
  connecting ??= new MongoClient(useRuntimeConfig().mongoUrl)
    .connect()
    .catch((err) => {
      connecting = undefined; // a próxima requisição tenta de novo
      throw err;
    });

  return (await connecting).db();
}

export async function closeDb() {
  const client = await connecting?.catch(() => undefined);
  await client?.close();
}
```

A URL vem do `runtimeConfig`. Em produção, a variável de ambiente `NITRO_MONGO_URL` preenche o valor sem mexer no código:

```ts [nitro.config.ts]
export default defineNitroConfig({
  srcDir: "server",
  compatibilityDate: "2025-01-01",
  runtimeConfig: {
    mongoUrl: "", // NITRO_MONGO_URL
  },
});
```

E para fechar a conexão quando o servidor desliga, um plugin com o hook `close`:

```ts [server/plugins/db.ts]
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("close", closeDb);
});
```

## Middleware

Arquivos em `server/middleware/` rodam antes de qualquer rota, em ordem alfabética. Uso para o que vale para todas as requisições, como colocar um id em cada uma para conseguir seguir ela nos logs:

```ts [server/middleware/request-id.ts]
export default defineEventHandler((event) => {
  event.context.requestId = crypto.randomUUID();
  setResponseHeader(event, "x-request-id", event.context.requestId);
});
```

::alert{type="error" title="Não retorne nada"}
Se o middleware retornar um valor, o Nitro usa esse valor como resposta e a rota nunca roda. Para barrar uma requisição, como uma sem token, use `throw createError(...)`.
::

## Cache antes de máquina nova

Antes de subir mais instâncias, vale olhar quais rotas devolvem quase sempre a mesma coisa. Ranking, lista de categorias e configuração pública podem ficar em cache por alguns segundos ou minutos, e o banco agradece.

```ts [server/routes/ranking.get.ts]
export default defineCachedEventHandler(
  async () => {
    const db = await useDb();
    return db.collection("scores").find().sort({ score: -1 }).limit(50).toArray();
  },
  { name: "ranking", maxAge: 60, swr: true },
);
```

Com `swr: true`, quando o cache vence o Nitro ainda responde com o valor antigo e atualiza em segundo plano, então ninguém fica esperando a consulta. Para rotas que você não quer tocar no código, dá para fazer o mesmo pelo `routeRules`:

```ts [nitro.config.ts]
export default defineNitroConfig({
  // ...
  routeRules: {
    "/categories/**": { cache: { maxAge: 60 * 60 } },
  },
});
```

O detalhe que pesa na hora de escalar: em produção esse cache fica *na memória de cada instância*. Com três instâncias são três caches diferentes, e o banco recebe três vezes a mesma consulta. Montando o storage `cache` num Redis, todas passam a dividir o mesmo:

```ts [server/plugins/storage.ts]
import redisDriver from "unstorage/drivers/redis";

export default defineNitroPlugin(() => {
  const { redisUrl } = useRuntimeConfig(); // NITRO_REDIS_URL

  // Em dev o Nitro já monta o cache em disco, e montar de novo dá erro
  if (!import.meta.dev && redisUrl) {
    useStorage().mount("cache", redisDriver({ url: redisUrl }));
  }
});
```

::alert{type="info" title="Por que um plugin?"}
Dá para configurar o Redis no `storage` do `nitro.config.ts`, mas as opções de lá são gravadas no build. Se a URL vem de uma variável de ambiente que só existe no servidor, ela chega vazia. No plugin ela é lida quando o servidor sobe.
::

## Antes de subir a segunda instância

O cache é só um caso de uma regra maior: o que precisa ser igual entre requisições não pode morar na memória do processo. Com uma instância ninguém percebe. Com duas atrás de um balanceador, cada requisição cai numa máquina e as coisas começam a sumir.

Esta é a lista que eu confiro antes. Marquei o que já fica resolvido se você seguiu o artigo até aqui:

- [x] Conexão com o banco aberta uma vez por instância
- [x] Cache das rotas no Redis
- [ ] Sessão em cookie assinado ou no Redis, nunca num `Map` em memória
- [ ] Rate limit contando no Redis (contador em memória deixa passar o dobro com duas instâncias)
- [ ] Upload indo para um storage como o S3, e não para o disco da máquina

> Primeiro faz funcionar numa instância. Depois tira o estado da memória. Só então pensa em mais máquinas.

## Deploy

O build gera uma pasta `.output` com as dependências que o servidor usa, então não precisa de `node_modules` em produção. O que muda de um destino para outro é o *preset*:

```bash
# servidor Node comum, um processo
npx nitro build
node .output/server/index.mjs

# um processo por núcleo de CPU, na mesma máquina
NITRO_PRESET=node_cluster npx nitro build
node .output/server/index.mjs
```

O `node_cluster` é o jeito mais barato de usar a máquina inteira, porque um processo Node sozinho usa um núcleo só. Para serverless existem os presets `vercel`, `netlify` e `cloudflare_module`, e aí a plataforma cuida de subir instâncias. Em Docker, a imagem final leva só a `.output`:

```dockerfile [Dockerfile]
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx nitro build

FROM node:22-alpine
WORKDIR /app
COPY --from=build /app/.output ./.output
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
```

---

## Fechando

1. Rotas por arquivo deixam o projeto organizado sem esforço.
2. Tudo que vem de fora passa por um schema.
3. Uma conexão com o banco por instância.
4. Cache com `swr` antes de pensar em mais máquinas, e no Redis quando tiver mais de uma.
5. Nenhum estado importante na memória do processo.
6. O preset certo para onde a API vai rodar.

A [documentação do Nitro](https://nitro.build) é curta e vale a leitura inteira. O back-end do [Flaggle Versus](https://flaggle-versus.vercel.app) segue esse formato, com rotas por arquivo, utils e plugins. Se ficou alguma dúvida, me chama pelo [formulário de contato](/#contact-me).

[^1]: O h3 é o framework HTTP que o Nitro usa por baixo. Os helpers como `getRouterParam` e `readValidatedBody` vêm dele. A documentação fica em [h3.unjs.io](https://h3.unjs.io).
