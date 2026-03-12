# Estudo - Task Management App

Uma aplicação de gerenciamento de tarefas desenvolvida com Next.js, TypeScript, Firebase e NextAuth.

## 🚀 Tecnologias Utilizadas

- **Next.js 16.1.6** - Framework React para produção
- **React 19.2.3** - Biblioteca para interfaces de usuário
- **TypeScript** - JavaScript com tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Firebase** - Plataforma de desenvolvimento de aplicações
- **NextAuth.js** - Autenticação para Next.js
- **React Icons** - Biblioteca de ícones

## 📋 Funcionalidades

- ✅ Autenticação de usuários com NextAuth
- ✅ Gerenciamento de tarefas (CRUD)
- ✅ Dashboard para visualizar tarefas
- ✅ Interface responsiva com Tailwind CSS
- ✅ Integração com Firebase para armazenamento de dados
- ✅ Roteamento dinâmico para tarefas individuais

## 🛠️ Instalação e Configuração

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Conta no Firebase
- Conta no provedor de autenticação (Google, GitHub, etc.)

### Passos para instalação

1. **Clone o repositório:**

   ```bash
   git clone <https://github.com/caiofeitosadev/tasks-plusplus.git>
   cd tasks
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure o Firebase:**
   - Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
   - Ative o Firestore Database
   - Copie as configurações do SDK para `lib/firebaseConnection.ts`

4. **Configure a autenticação:**
   - Configure os provedores de autenticação no NextAuth
   - Adicione as variáveis de ambiente necessárias

5. **Execute o projeto:**

   ```bash
   npm run dev
   # ou
   yarn dev
   ```

   A aplicação estará disponível em [http://localhost:3000](http://localhost:3000)

## 📁 Estrutura do Projeto

```
tasks/
├── app/                    # Páginas da aplicação (App Router)
│   ├── api/
│   │   └── auth/[...nextauth]/
│   ├── dashboard/          # Página do dashboard
│   ├── task/[id]/          # Página de tarefa individual
│   ├── globals.css         # Estilos globais
│   ├── layout.tsx          # Layout principal
│   └── page.tsx            # Página inicial
├── components/             # Componentes reutilizáveis
│   ├── header/             # Componente de cabeçalho
│   ├── provider/           # Provedores de contexto
│   └── textarea/           # Componente de textarea customizado
├── lib/                    # Utilitários e configurações
│   ├── auth.ts             # Configuração do NextAuth
│   └── firebaseConnection.ts # Conexão com Firebase
├── public/                 # Arquivos estáticos
└── package.json            # Dependências e scripts
```

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Build da aplicação para produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter ESLint

## 🌐 Deploy

Esta aplicação pode ser facilmente implantada em plataformas como:

- [Vercel](https://vercel.com/) (recomendado para Next.js)
- [Netlify](https://netlify.com/)
- [Railway](https://railway.app/)
- [Render](https://render.com/)

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Contato

Para dúvidas ou sugestões, entre em contato através das issues do repositório.
