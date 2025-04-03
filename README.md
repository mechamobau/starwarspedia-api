# starwars-api

API Node.js que atua como camada de cache para a [SWAPI (Star Wars API)](https://swapi.dev/), utilizando Redis para armazenamento temporário de respostas. Inclui configurações Docker para desenvolvimento e produção, TypeScript e testes automatizados.

## ✨ Funcionalidades

- 🚀 Proxy para todos os endpoints da SWAPI
- ⚡ Cache Redis com TTL de 1 hora
- 🐳 Configuração Docker para desenvolvimento e produção
- ✅ Testes unitários e de integração
- 🔍 Tipagem estática com TypeScript
- 🔄 Auto-reload em desenvolvimento

## Pré-requisitos

- Node.js v18+
- Docker e Docker Compose
- Redis (opcional para desenvolvimento local)

## 🛠 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/starwars-api.git
cd starwars-api
```

2. Instale as dependências:
```bash
npm install
```

3. Crie o arquivo `.env`:
```bash
cp .env.example .env
```
Preencha as variáveis de ambiente conforme necessário.

## ▶ Execução

### Desenvolvimento (com Docker):
```bash
docker-compose up
```
A API estará disponível em: `http://localhost:3000`

### Produção:
```bash
docker build -t starwars-api .
docker run -p 3000:3000 starwars-api
```

### Localmente (sem Docker):
```bash
npm run dev
```

## 🧪 Testes
```bash
# Todos os testes
npm test

# Testes unitários
npm test -- unit

# Testes de integração
npm test -- integration

# Modo watch
npm run test:watch
```

## 📚 Endpoints

A API replica todos os recursos da SWAPI:

```
GET /api/:resource/:id
```

Parâmetros:
- `resource`: Tipo de recurso (people, films, planets, etc)
- `id`: ID do recurso

Exemplo:
```bash
GET /api/people/1
```

Resposta:
```json
{
  "name": "Luke Skywalker",
  "height": "172",
  "mass": "77",
  ...(dados da SWAPI)
}
```

## 🔄 Comportamento do Cache
- Primeira requisição: Busca na SWAPI e armazena no Redis
- Requisições subsequentes: Retorna dados do cache
- Cache expira após 3600 segundos (1 hora)

## 🐳 Configuração Docker

- **Dockerfile.dev**: Configuração de desenvolvimento com hot-reload
- **Dockerfile**: Build otimizado para produção
- **Redis**: Serviço separado no compose

## 🏗 Estrutura do Projeto
```
.
├── src/
│   ├── controllers/    # Lógica dos endpoints
│   ├── routes/         # Configuração de rotas
│   ├── utils/          # Conexão com Redis
│   └── app.ts          # Configuração do Express
├── test/               # Testes automatizados
├── docker-compose.yml  # Ambiente de desenvolvimento
└── Dockerfile*         # Configurações de container
```

## 🤝 Contribuindo
1. Faça um fork do projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença
Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

**Nota**: Garanta que o serviço Redis esteja rodando antes de iniciar a aplicação. Em ambiente Docker, isso é gerenciado automaticamente pelo compose.
``` 

Este README inclui:
- Instruções claras de instalação e uso
- Detalhes da arquitetura
- Políticas de cache
- Configuração de ambiente
- Guia de contribuição
- Documentação da API

Você pode personalizar com:
- Badges de status CI/CD
- Exemplos adicionais de requests
- Diagramas de arquitetura
- Informações de monitoramento