# Logistics API

API mock de **rastreamento de encomendas entre transportadoras**, desenvolvida para a atividade *Representação de Dados e Interoperabilidade* da disciplina de **Sistemas Distribuídos** (IFCE Tianguá).

## Contexto

Uma plataforma de comércio eletrônico trabalha com várias transportadoras, e cada uma registra as etapas da entrega com informações e códigos próprios.

Esta API faz o papel do **Grupo C (API mock)** do *Estudo de Caso 2*: fornece encomendas, códigos de rastreio, transportadoras, localizações, datas, previsões de entrega e histórico de movimentações. Ela é consumida pela aplicação cliente do **Grupo D**, que apresenta o histórico, calcula o tempo de transporte e identifica atrasos.

### Desafio de interoperabilidade

Como os dados vêm de transportadoras diferentes, a API reproduz de propósito as inconsistências do mundo real, que o cliente precisa padronizar:

- **Status com nomes diferentes para a mesma etapa**, como `EM_TRANSITO`, `IN_TRANSIT` e `EM ROTA`.
- **Datas e horários em representações diferentes**, como ISO 8601 com fuso, timestamp Unix ou formato brasileiro `dd/mm/aaaa`.

### Transportadoras cadastradas

Cada transportadora tem o seu próprio padrão de data e o seu próprio vocabulário de status:

| Transportadora | `formatoData` | Exemplo de data | `listaStatus` |
|---|---|---|---|
| Rápido Nordeste | `DD/MM/YYYY HH:mm` | `14/11/2026 14:00` | `POSTADO`, `EM_TRANSITO`, `SAIU_PARA_ENTREGA`, `ENTREGUE` |
| Global Express | `ISO8601` | `2026-11-14T14:00:00-03:00` | `PICKED_UP`, `IN_TRANSIT`, `OUT_FOR_DELIVERY`, `DELIVERED` |
| Ceará Cargas | `UNIX` | `1794675600` | `COLETADO`, `EM ROTA`, `EM ENTREGA`, `FINALIZADO` |
| LogBR | `MM/DD/YYYY hh:mm A` | `11/14/2026 02:00 PM` | `Objeto postado`, `Em trânsito`, `Saiu para entrega`, `Entregue ao destinatário` |

A ordem da `listaStatus` segue o fluxo da entrega: o último item é sempre o status final (entregue).

## Modelagem de dados

```
Transportadora 1 ───< N Encomenda 1 ───< N Movimentacao
```

Uma transportadora tem várias encomendas, e uma encomenda tem várias movimentações. O conjunto de movimentações de uma encomenda é o seu **histórico de rastreio**.

### Transportadora

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | Integer (PK) | Identificador |
| `nome` | Varchar | Nome da transportadora |
| `formatoData` | Varchar | Formato em que a transportadora registra datas |
| `listaStatus` | JSON | Lista dos códigos de status usados pela transportadora, em ordem |
| `createdAt` | Datetime | Data de criação do registro |

### Encomenda

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | Integer (PK) | Identificador |
| `codigoRastreio` | Varchar (único) | Código usado para rastrear a encomenda |
| `transportadoraID` | Integer (FK) | Transportadora responsável |
| `origem` | Varchar | Cidade de origem |
| `destino` | Varchar | Cidade de destino |
| `dataPostagem` | Varchar | Data de postagem, no formato da transportadora |
| `previsaoEntrega` | Varchar | Previsão de entrega, no formato da transportadora |
| `createdAt` | Datetime | Data de criação do registro |

### Movimentacao

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | Integer (PK) | Identificador |
| `encomendaID` | Integer (FK) | Encomenda a que o evento pertence |
| `status` | Varchar | Código de status, exatamente como a transportadora usa |
| `local` | Varchar | Cidade onde o evento ocorreu |
| `latitude` | Decimal(8,6) | Latitude do local (-90 a 90) |
| `longitude` | Decimal(9,6) | Longitude do local (-180 a 180) |
| `dataHora` | Varchar | Data e hora do evento, no formato da transportadora |
| `createdAt` | Datetime | Data de criação do registro |

### Decisões de modelagem

- **Datas das transportadoras são texto (`Varchar`).** `dataPostagem`, `previsaoEntrega` e `dataHora` são gravadas exatamente como cada transportadora as envia. Converter para um tipo de data no banco eliminaria a inconsistência que o cliente precisa resolver.
- **A ordenação usa `createdAt` e `id`, e não `dataHora`.** Como `dataHora` está em quatro formatos diferentes, ordenar por ela como texto daria um resultado errado (`"02/12/2026"` viria antes de `"21/11/2026"`). O `createdAt` é controlado pela API e está sempre no mesmo formato, então o histórico é ordenado por ele, com o `id` como desempate.
- **`listaStatus` é só uma lista, sem mapeamento para um status padrão.** A API informa quais códigos cada transportadora usa, mas não diz qual código equivale a qual. Fazer essa equivalência é tarefa do cliente.
- **O status de uma movimentação precisa pertencer à `listaStatus` da transportadora.** O banco não consegue garantir isso, porque uma chave estrangeira não aponta para dentro de um campo JSON. A regra fica numa validação do model `Movimentacao`, e um status inválido é recusado com erro 400.
- **O status atual de uma encomenda não é guardado.** Ele é sempre a última movimentação do histórico, o que evita ter a mesma informação em dois lugares.

## Rotas

Todas as rotas começam com **`http://localhost:3000/api/v1`** e respondem em JSON. A documentação interativa fica em **http://localhost:3000/docs**, e o arquivo [`docs/insomnia.json`](docs/insomnia.json) pode ser importado no Insomnia com exemplos de todas as requisições.

### Respostas de erro

| Código | Quando acontece | Corpo |
|---|---|---|
| `400` | Dados inválidos ou campo obrigatório ausente | `{ "errors": ["mensagem", ...] }` |
| `404` | Registro não encontrado | `{ "error": "mensagem" }` |
| `500` | Erro interno | `{ "error": "Internal server error" }` |

### Transportadora

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/transportadora` | Lista as transportadoras |
| `GET` | `/transportadora/:id` | Busca uma transportadora pelo id |
| `GET` | `/transportadora/:id/encomendas` | Busca uma transportadora junto com as suas encomendas |
| `POST` | `/transportadora/create` | Cadastra uma transportadora |
| `PUT` | `/transportadora/update/:id` | Atualiza uma transportadora |
| `DELETE` | `/transportadora/delete/:id` | Remove uma transportadora |

**Filtro de `GET /transportadora`:**

| Parâmetro | Busca | Exemplo |
|---|---|---|
| `nome` | Parcial | `/transportadora?nome=express` |

**`GET /transportadora/:id/encomendas`** devolve a transportadora com o campo `Encomendas`. Assim o cliente recebe, numa só requisição, as encomendas e as informações necessárias para interpretá-las (`formatoData` e `listaStatus`). Responde 404 se a transportadora não existir.

**Exemplo de `POST /transportadora/create`:**

```json
{
  "nome": "Nova Transportadora",
  "formatoData": "ISO8601",
  "listaStatus": ["POSTADO", "EM_TRANSITO", "ENTREGUE"]
}
```

Todos os campos são obrigatórios. Responde `201` com a transportadora criada.

### Encomenda

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/encomenda` | Lista as encomendas |
| `GET` | `/encomenda/:id` | Busca uma encomenda pelo id, com transportadora e histórico |
| `GET` | `/encomenda/rastreio/:codigoRastreio` | Busca uma encomenda pelo código de rastreio, com transportadora e histórico |
| `POST` | `/encomenda/create` | Cadastra uma encomenda |
| `PUT` | `/encomenda/update/:id` | Atualiza uma encomenda |
| `DELETE` | `/encomenda/delete/:id` | Remove uma encomenda |

**Filtros de `GET /encomenda`** (podem ser combinados):

| Parâmetro | Busca | Exemplo |
|---|---|---|
| `transportadoraID` | Exata | `/encomenda?transportadoraID=2` |
| `codigoRastreio` | Exata | `/encomenda?codigoRastreio=GX000001004BR` |
| `origem` | Parcial | `/encomenda?origem=Recife` |
| `destino` | Parcial | `/encomenda?destino=Fortaleza` |
| `include` | Inclui o histórico | `/encomenda?include=movimentacoes` |

Sem filtros, devolve todas as encomendas. Não existem filtros por data ou por status padronizado, porque o servidor não interpreta os formatos das transportadoras (isso é tarefa do cliente).

**`GET /encomenda/rastreio/:codigoRastreio`** é a rota principal de rastreio. Exemplo de resposta para `/encomenda/rastreio/GX000001004BR`:

```json
{
  "id": 14,
  "codigoRastreio": "GX000001004BR",
  "origem": "Recife/PE",
  "destino": "Tianguá/CE",
  "dataPostagem": "2026-11-17T11:00:00-03:00",
  "previsaoEntrega": "2026-11-22T11:00:00-03:00",
  "transportadoraID": 2,
  "Transportadora": {
    "id": 2,
    "nome": "Global Express",
    "formatoData": "ISO8601",
    "listaStatus": ["PICKED_UP", "IN_TRANSIT", "OUT_FOR_DELIVERY", "DELIVERED"]
  },
  "Movimentacoes": [
    { "id": 43, "status": "PICKED_UP", "local": "Recife/PE", "latitude": -8.047562, "longitude": -34.877, "dataHora": "2026-11-17T11:00:00-03:00" },
    { "id": 44, "status": "IN_TRANSIT", "local": "Fortaleza/CE", "latitude": -3.731862, "longitude": -38.526669, "dataHora": "2026-11-18T20:00:00-03:00" },
    { "id": 45, "status": "OUT_FOR_DELIVERY", "local": "Tianguá/CE", "latitude": -3.73221, "longitude": -40.99174, "dataHora": "2026-11-20T08:00:00-03:00" }
  ]
}
```

O campo `createdAt` foi omitido do exemplo. As movimentações vêm sempre em ordem cronológica de registro. Responde 404 se o código não existir.

**Exemplo de `POST /encomenda/create`:**

```json
{
  "codigoRastreio": "TS000000001BR",
  "transportadoraID": 2,
  "origem": "Fortaleza/CE",
  "destino": "Tianguá/CE",
  "dataPostagem": "2026-11-20T10:00:00-03:00",
  "previsaoEntrega": "2026-11-25T10:00:00-03:00"
}
```

Todos os campos são obrigatórios e o `codigoRastreio` não pode se repetir. Responde `201` com a encomenda criada.

**`PUT` e `DELETE`** (em encomenda e transportadora) respondem com a quantidade de registros afetados: `[1]` no `PUT` e `1` no `DELETE`. Uma resposta `[0]` ou `0` significa que o id não existe.

### Movimentacao

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/movimentacao/list` | Lista as movimentações, em ordem cronológica de registro |
| `POST` | `/movimentacao/create` | Registra um novo evento no histórico de uma encomenda |

**Filtros de `GET /movimentacao/list`:**

| Parâmetro | Busca | Exemplo |
|---|---|---|
| `encomendaID` | Exata | `/movimentacao/list?encomendaID=14` |
| `status` | Exata, com o código da transportadora | `/movimentacao/list?status=IN_TRANSIT` |

**Exemplo de `POST /movimentacao/create`:**

```json
{
  "encomendaID": 14,
  "status": "DELIVERED",
  "local": "Tianguá/CE",
  "latitude": -3.73221,
  "longitude": -40.99174,
  "dataHora": "2026-11-20T15:30:00-03:00"
}
```

O `status` precisa estar na `listaStatus` da transportadora da encomenda, e a `dataHora` deve seguir o `formatoData` dela. Um status inválido é recusado:

```json
{
  "errors": ["Status \"ENTREGUE\" não existe na transportadora Global Express. Válidos: PICKED_UP, IN_TRANSIT, OUT_FOR_DELIVERY, DELIVERED"]
}
```

Não existem rotas para editar ou remover movimentações: um histórico de rastreio só recebe eventos novos.

## Tecnologias

- **Node.js** + **Express 5**: servidor HTTP
- **Sequelize** + **SQLite**: persistência em um arquivo local, sem instalar banco de dados
- **Swagger UI**: documentação interativa gerada a partir de um arquivo OpenAPI escrito à mão (`docs/openapi.yaml`)

## Como rodar localmente

### 1. Instalar o Node.js (versão 20 ou superior)

**Windows:** baixe o instalador **LTS** em https://nodejs.org e siga o assistente.

**Linux / WSL / macOS:** recomendado usar o [nvm](https://github.com/nvm-sh/nvm):

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
# feche e reabra o terminal
nvm install --lts
```

Confira a instalação:

```bash
node -v   # deve mostrar v20.x ou superior
npm -v
```

### 2. Clonar o repositório

```bash
git clone https://github.com/WilghanerSilva/logistics-api.git
cd logistics-api
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Iniciar o servidor

```bash
npm run dev     # modo desenvolvimento (reinicia ao salvar arquivos)
# ou
npm start       # modo normal
```

O servidor sobe em **http://localhost:3000**. A documentação interativa fica em **http://localhost:3000/docs**.

O banco `database.sqlite` é **versionado no repositório**, para que todos usem os mesmos dados mock. Se você alterou os dados localmente e quer voltar ao estado original: `git checkout database.sqlite`.

### Variáveis de ambiente (opcionais)

| Variável | Padrão | Descrição |
|---|---|---|
| `PORT` | `3000` | Porta do servidor |
| `DB_STORAGE` | `database.sqlite` | Arquivo do banco (`:memory:` para banco em memória) |

Exemplo: `PORT=8080 npm run dev`

## Estrutura do projeto

```
├── database.sqlite      # banco com os dados mock (versionado)
├── docs/
│   ├── openapi.yaml     # especificação da API (OpenAPI 3)
│   └── insomnia.json    # coleção de requisições para importar no Insomnia
└── src/
    ├── server.js        # inicializa o banco e sobe o servidor
    ├── app.js           # configuração do Express, Swagger e tratamento de erros
    ├── database.js      # conexão Sequelize/SQLite
    ├── Models/          # tabelas, validações e relacionamentos (index.js)
    ├── Routes/          # URLs de cada recurso
    ├── Controllers/     # leitura da requisição e montagem da resposta
    └── Services/        # consultas ao banco
```

## Problemas comuns

- **`npm install` falha ao compilar o `sqlite3`:** confirme que está usando Node 20 ou superior (`node -v`). Versões antigas não têm binário pré-compilado.
- **`EADDRINUSE: address already in use`:** a porta 3000 já está ocupada. Use outra com `PORT=3001 npm run dev`.
