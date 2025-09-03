# Agendly Backend

Backend da aplicação Agendly - Sistema de agendamento e gestão de clientes.

## 🚀 Funcionalidades

- **Autenticação JWT** - Sistema seguro de autenticação
- **Gestão de Usuários** - CRUD completo de usuários com roles e permissões
- **Gestão de Clientes** - Cadastro e informações adicionais dos clientes
- **Gestão de Empresas** - Múltiplas empresas com isolamento de dados
- **Sistema de Agendamentos** - Agendamento inteligente com status e histórico
- **Gestão de Serviços** - Catálogo de serviços por localização
- **Sistema de Planos** - Diferentes tipos de planos e assinaturas
- **API RESTful** - Construída com Fastify para alta performance

## 📋 Pré-requisitos

- **Node.js** 18+ 
- **PostgreSQL** 15+
- **Docker** (opcional, para desenvolvimento)

## 🛠️ Instalação

### 1. Clone e instale as dependências
```bash
git clone https://github.com/DavidMPRocha/Agendly-Backend.git
cd Agendly-Backend
npm install
```

### 2. Configure o ambiente
```bash
cp env.example .env
# Edite o arquivo .env com suas configurações
```

### 3. Configure o banco de dados
```bash
# Usando Docker (recomendado para desenvolvimento)
docker-compose up -d

# Ou configure diretamente no PostgreSQL
# Crie um banco de dados e configure as variáveis de ambiente

# Execute as migrações
npm run db:migrate

# Popule com dados iniciais (opcional)
npm run db:seed
```

### 4. Execute a aplicação
```bash
# Desenvolvimento
npm run dev

# Produção
npm run start
```

## 🔧 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Executa em modo desenvolvimento com hot-reload |
| `npm run start` | Executa em modo produção |
| `npm run build` | Compila o projeto TypeScript |
| `npm run test` | Executa os testes unitários |
| `npm run test:watch` | Executa testes em modo watch |
| `npm run db:migrate` | Executa as migrações do banco |
| `npm run db:seed` | Popula o banco com dados iniciais |
| `npm run db:generate` | Gera nova migração baseada no schema |

## 🌍 Variáveis de Ambiente

Crie um arquivo `.env` baseado no `env.example`:

```env
# Servidor
PORT=3333
HOST=localhost

# Banco de dados
DATABASE_URL=postgresql://user:password@localhost:5432/agendly

# JWT
JWT_SECRET=your-super-secret-jwt-key

# Logs
LOG_LEVEL=info
```

## 🏗️ Estrutura do Projeto

```
src/
├── db/                    # Camada de banco de dados
│   ├── connection.ts      # Conexão com PostgreSQL
│   ├── migrations/        # Migrações do banco
│   ├── schema/           # Schemas Drizzle ORM
│   └── seed/             # Dados iniciais
├── http/                 # Camada HTTP/API
│   ├── controllers/      # Controladores da aplicação
│   ├── middleware/       # Middlewares (auth, error handling)
│   ├── routes/           # Definição das rotas
│   └── schemas/          # Validação de entrada
├── utils/                # Utilitários e helpers
├── env.ts                # Configuração de ambiente
└── server.ts             # Ponto de entrada da aplicação
```

## 📚 Endpoints da API

### Autenticação
- `POST /auth/login` - Login de usuário
- `POST /auth/refresh` - Renovar token JWT

### Usuários
- `GET /users` - Listar usuários
- `POST /users` - Criar usuário
- `GET /users/:id` - Buscar usuário por ID
- `PUT /users/:id` - Atualizar usuário
- `DELETE /users/:id` - Deletar usuário

### Clientes
- `GET /clients` - Listar clientes
- `POST /clients` - Criar cliente
- `GET /clients/:id` - Buscar cliente por ID
- `PUT /clients/:id` - Atualizar cliente
- `DELETE /clients/:id` - Deletar cliente

### Agendamentos
- `GET /appointments` - Listar agendamentos
- `POST /appointments` - Criar agendamento
- `GET /appointments/:id` - Buscar agendamento por ID
- `PUT /appointments/:id` - Atualizar agendamento
- `DELETE /appointments/:id` - Deletar agendamento

## 🧪 Testes

```bash
# Executar todos os testes
npm run test

# Executar testes em modo watch
npm run test:watch

# Executar testes com coverage
npm run test:coverage
```

## 🐳 Docker

Para desenvolvimento com Docker:

```bash
# Subir serviços
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar serviços
docker-compose down
```

## 📦 Tecnologias Utilizadas

- **Runtime**: Node.js
- **Framework**: Fastify
- **ORM**: Drizzle
- **Banco**: PostgreSQL
- **Autenticação**: JWT
- **Validação**: Zod
- **Testes**: Vitest
- **TypeScript**: Configurado com strict mode

## 🤝 Contribuindo

1. **Fork** do projeto
2. Crie uma **branch** para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. Abra um **Pull Request**

### Padrões de Commit

Use commits semânticos:
- `feat:` para novas funcionalidades
- `fix:` para correções de bugs
- `docs:` para documentação
- `style:` para formatação
- `refactor:` para refatoração
- `test:` para testes
- `chore:` para tarefas de manutenção

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

Para dúvidas ou suporte:
- Abra uma [issue](https://github.com/DavidMPRocha/Agendly-Backend/issues)
- Entre em contato com a equipe de desenvolvimento

---

**Desenvolvido com ❤️ pela equipe Agendly**