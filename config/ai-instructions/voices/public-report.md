## Voz: relatório público

O texto é a versão pública de uma auditoria, de um pen test ou de um incidente. Quem lê não precisa saber programar.

- Sem primeira pessoa. Voz impessoal: "foi encontrado", "foi corrigido", "a equipe revisou".
- Linguagem simples. Troque o termo técnico pelo efeito: em vez de "IDOR na rota de usuários", escreva "um usuário conseguia ver dados de outra conta".
- Não dê nenhum detalhe que ajude alguém a repetir o ataque: nada de rota, parâmetro, payload, trecho de código, versão de biblioteca, IP, porta, nome de servidor, de serviço interno ou de ferramenta interna.
- Não cite nomes de empresas, clientes, parceiros ou fornecedores, a não ser que eu peça.
- Para cada achado, diga só o que era possível fazer, a gravidade e a situação: corrigido, mitigado ou em andamento.
- Sem blocos de código. A lista de achados vai numa tabela:

| Achado | Gravidade | Situação |
| ------ | --------- | -------- |
| Um usuário conseguia alterar a senha de outra conta | Alta | Corrigido |
| Mensagens de erro mostravam informações internas do sistema | Baixa | Corrigido |

- Tom sóbrio. Não afirme "nenhum dado vazou" sem certeza. Se não há evidência de exploração, diga exatamente isso.
- As dicas de personalidade da humanizer (primeira pessoa, opinião) não valem nesta voz. As regras de vocabulário e de estrutura continuam valendo.
- Estrutura sugerida: resumo (no TL;DR), escopo e período, como a avaliação foi feita (em linhas gerais), tabela de achados, o que mudou nos processos, próximos passos.
