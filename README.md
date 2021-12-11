## financeAPI 

### 💻 Projeto
API financeira desenvolvida durante as aulas do primeiro capítulo do Bootcamp Ignite (trilha NodeJS) fornecido pela [Rocketseat](https://www.rocketseat.com.br/ignite).

Durante o desenvolvimento deste capítulo foram aborados conceitos básicos de:

- Requisições **HTTP**;
- Funções **Middleware**;
- Gerenciamento requisições através do framework **Express**.

Um ponto que não esta sendo abordado pelo curso, mas foi práticado neste projeto é 
o desenvolvimento de documentações através do [JSDoc](https://jsdoc.app/)
(projeto desenvolvido com o propósito de documentar APIs e/ou bibliotecas JavaScript.)

---
### Requisitos de ambiente

- NodeJs + NPM;
- Yarn;
- Editor de código (Aconselhável uso do VsCode);
- API Client (Aconselhável uso do Insomnia | Postman).

### Execução do Projeto
Utilize o yarn para instalar as dependências do projeto.

Instalação das dependências
```bash
  $ yarn install
```
Instância do servidor na porta 3030 (http://localhost:3030)
```bash
  $ yarn dev
```

### Requisitos

- [x] Deve ser possível criar uma conta;
- [x] Deve ser possível buscar o extrato bancário do cliente;
- [x] Deve ser possível realizar um depósito;
- [] Deve ser possível realizar um saque;
- [] Deve ser possível buscar o extrato bancário do cliente por data;
- [] Deve ser possível atualizar dados da conta do cliente;
- [] Deve ser possível obter dados da conta do cliente;
- [] Deve ser possível deletar uma conta;
- [] Deve ser possível retornar o balanço.

---

### Regras de negócio

- [x] Não deve ser possível cadastrar uma conta com CPF já exístente;
- [x] Não deve ser possível buscar extrato em uma conta não exístente;
- [] Não deve ser possível fazer depósito em uma conta não exístente;
- [] Não deve ser possível fazer saque em uma conta não exístente;
- [] Não deve ser possível fazer saque quando o saldo for insuficiente;
- [] Não deve ser possível excluir uma conta não exístente.
