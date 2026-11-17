# Logistics API

API mock de **rastreamento de encomendas entre transportadoras**, desenvolvida para a atividade *Representação de Dados e Interoperabilidade* da disciplina de **Sistemas Distribuídos** (IFCE Tianguá).

## Contexto

Uma plataforma de comércio eletrônico trabalha com várias transportadoras, e cada uma registra as etapas da entrega com informações e códigos próprios.

Esta API faz o papel do **Grupo C (API mock)** do *Estudo de Caso 2*: fornece encomendas, códigos de rastreio, transportadoras, localizações, datas, previsões de entrega e histórico de movimentações. Ela é consumida pela aplicação cliente do **Grupo D**, que apresenta o histórico, calcula o tempo de transporte e identifica atrasos.

### Desafio de interoperabilidade

Como os dados vêm de transportadoras diferentes, a API reproduz de propósito as inconsistências do mundo real, que o cliente precisa padronizar:

- **Status com nomes diferentes para a mesma etapa**, como `EM_TRANSITO`, `IN_TRANSIT` e `EM ROTA`.
- **Datas e horários em representações diferentes**, como ISO 8601 com fuso, timestamp Unix ou formato brasileiro `dd/mm/aaaa`.

## Recursos da API

> 🚧 Em construção. O contrato completo fica em [`docs/openapi.yaml`](docs/openapi.yaml) e pode ser visto de forma interativa em **http://localhost:3000/docs** com o servidor rodando.

Recursos previstos, de acordo com o enunciado:

| Recurso | Descrição |
|---|---|
| Encomendas | Código de rastreio, transportadora, origem/destino, datas e previsão de entrega |
| Transportadoras | Identificação de cada transportadora e do seu padrão de dados |
| Histórico de movimentações | Eventos de rastreio (status, localização, data/hora) de cada encomenda |

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
├── docs/
│   └── openapi.yaml   # especificação da API (OpenAPI 3)
└── src/
    ├── server.js      # inicializa o banco e sobe o servidor
    ├── app.js         # configuração do Express, Swagger e tratamento de erros
    └── database.js    # conexão Sequelize/SQLite
```

## Problemas comuns

- **`npm install` falha ao compilar o `sqlite3`:** confirme que está usando Node 20 ou superior (`node -v`). Versões antigas não têm binário pré-compilado.
- **`EADDRINUSE: address already in use`:** a porta 3000 já está ocupada. Use outra com `PORT=3001 npm run dev`.
