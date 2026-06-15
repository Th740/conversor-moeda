# API de Conversão de Moedas

## Descrição

Este projeto consiste em uma API REST desenvolvida utilizando NestJS, TypeScript e MongoDB para realizar conversões de moedas em tempo real.

A aplicação consulta uma API externa de câmbio para obter as taxas atualizadas e realiza a conversão dos valores para:

- BRL (Real Brasileiro)
- USD (Dólar Americano)
- EUR (Euro)

Além disso, todas as conversões realizadas são armazenadas no banco de dados MongoDB para consulta posterior.

---

## Tecnologias Utilizadas

- NestJS
- TypeScript
- MongoDB Atlas
- Mongoose
- Swagger
- Axios
- Class Validator
- Class Transformer

---

## Funcionalidades

### Conversão de Moedas

Permite converter valores monetários utilizando taxas atualizadas em tempo real.

### Armazenamento das Conversões

Todas as conversões realizadas são salvas no banco de dados MongoDB.

### Documentação Swagger

A API possui documentação interativa disponível através do Swagger.

---

## Rotas Disponíveis

### Listar todas as conversões

GET

```http
/conversions
```

### Buscar conversão por ID

GET

```http
/conversions/:id
```

### Criar conversão

POST

```http
/conversions
```

Exemplo:

```json
{
  "amount": 100,
  "fromCurrency": "USD"
}
```

### Atualizar conversão

PUT

```http
/conversions/:id
```

### Excluir conversão

DELETE

```http
/conversions/:id
```

---

## Executando o Projeto

Instalar dependências:

```bash
npm install
```

Executar em modo desenvolvimento:

```bash
npm run start:dev
```

A API ficará disponível em:

```text
http://localhost:3000
```

Swagger:

```text
http://localhost:3000/api
```

---

## Estrutura do Projeto

```text
src/
├── common/
│   └── filters/
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
```

---

## Banco de Dados

O projeto utiliza MongoDB Atlas para armazenamento das conversões realizadas.

---

## Equipe

- Matheus Marcelino – 01815268
- Arthur Paiva – 01792621
- Lucio Daniel – 01825691

---

## Status do Projeto

Projeto desenvolvido para a AV2 da disciplina de Desenvolvimento Backend.

CRUD implementado, integração com MongoDB realizada, documentação Swagger configurada e consumo de API externa para obtenção das cotações em tempo real.
