# Agendly Backend

Backend da aplicação Agendly - Sistema de agendamento e gestão de clientes.

## Funcionalidades

- Autenticação JWT
- Gestão de usuários, clientes e empresas
- Sistema de agendamentos
- Gestão de serviços e planos
- API RESTful com Fastify

## Pré-requisitos

- Node.js 18+
- PostgreSQL 15+

## Instalação

1. Clone e instale:
```bash
git clone https://github.com/DavidMPRocha/Agendly-Backend.git
cd Agendly-Backend
npm install
```

2. Configure o ambiente:
```bash
cp env.example .env
# Edite o arquivo .env
```

3. Banco de dados:
```bash
docker-compose up -d
npm run db:migrate
npm run db:seed
```

4. Execute:
```bash
npm run dev
```

## Scripts Principais

- `npm run dev` - Desenvolvimento
- `npm run start` - Produção
- `npm run test` - Testes
- `npm run db:migrate` - Migrações
- `npm run db:seed` - Seed

## Estrutura

```
src/
├── db/           # Banco de dados
├── http/         # API HTTP
├── utils/        # Utilitários
└── server.ts     # Entrada
```

## Contribuindo

1. Fork do projeto
2. Crie uma branch para sua feature
3. Commit e push
4. Abra um Pull Request

## Licença

ISC
