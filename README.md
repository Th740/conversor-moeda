API de Conversão de Moedas

 Descrição

Este projeto consiste em uma API REST desenvolvida utilizando NestJS e TypeScript para realizar conversões de valores monetários para Dólar Americano (USD) e Euro (EUR).

A aplicação permite criar, consultar, atualizar e remover conversões através de endpoints documentados com Swagger.

---

 Tecnologias Utilizadas

* NestJS
* TypeScript
* Swagger/OpenAPI
* MongoDB
* Git e GitHub

---

 Funcionalidades

* Criar conversões de moedas
* Consultar conversões por ID
* Listar todas as conversões
* Atualizar conversões existentes
* Excluir conversões
* Conversão automática para USD e EUR
* Documentação automática com Swagger

---

 Instalação

Clone o repositório:

bash
git clone https://github.com/Th740/conversor-moeda.git


Entre na pasta do projeto:

bash
cd conversor-moeda


Instale as dependências:

bash
npm install


---

 Executando o Projeto

Modo desenvolvimento:

bash
npm run start:dev


Modo produção:

bash
npm run build
npm run start:prod


---

 Banco de Dados

O projeto utiliza MongoDB.

String de conexão utilizada:

txt
mongodb://localhost:27017/conversoes-db


---

 Documentação Swagger

Após iniciar o projeto, acesse:

txt
http://localhost:3000/api


 Rotas Disponíveis

 Criar Conversão

http
POST /conversions


Exemplo:

json
{
  "amount": 100,
  "fromCurrency": "BRL"
}


---

 Consultar Conversão

http
GET /conversions/{id}


---

 Listar Conversões

http
GET /conversions


---

 Atualizar Conversão

http
PATCH /conversions/{id}


Exemplo:

json
{
  "amount": 200
}


---

Remover Conversão

http
DELETE /conversions/{id}


---
 Regras de Negócio

* O valor deve ser maior que zero.
* A moeda de origem deve ser válida.
* Toda conversão gera valores em USD e EUR.
* As taxas de câmbio são simuladas.

---

 Estrutura do Projeto

txt
src/
├── conversions/
│   ├── dto/
│   ├── entities/
│   ├── conversions.controller.ts
│   ├── conversions.service.ts
│   ├── conversions.module.ts
│   └── conversion.schema.ts
├── app.module.ts
├── app.controller.ts
├── app.service.ts
└── main.ts


---

 Equipe

* Matheus Marcelino
* Lúcio
* Arthur

---

 Status do Projeto

Projeto desenvolvido para a AV2 da disciplina de Desenvolvimento Backend com NestJS.

CRUD implementado, documentação Swagger configurada e integração com MongoDB realizada.
