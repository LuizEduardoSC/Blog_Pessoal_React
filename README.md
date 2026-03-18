# Blog Pessoal - Frontend React

Este é o projeto frontend de um **Blog Pessoal**, desenvolvido com as tecnologias mais modernas do ecossistema React. Ele permite que usuários se cadastrem, façam login e gerenciem postagens e temas em uma interface intuitiva e responsiva.

---

## 🚀 O que o projeto faz?

O sistema funciona como uma plataforma de blog completa, onde é possível:

- **Autenticação Segura:** Cadastro e login de usuários com persistência de sessão (JWT).
- **Gestão de Temas:** Visualização, criação, edição e exclusão de categorias (temas) para as postagens.
- **Gestão de Postagens:** Criação de conteúdos vinculados a temas específicos, com suporte a edição e remoção.
- **Perfil do Usuário:** Espaço dedicado para exibir as informações do autor logado.
- **Feedback Visual:** Notificações em tempo real (Toasts) para ações de sucesso ou erro.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes ferramentas:

- **[React](https://reactjs.org/):** Biblioteca principal para construção da interface.
- **[TypeScript](https://www.typescriptlang.org/):** Adiciona tipagem estática ao JavaScript, garantindo maior segurança e produtividade.
- **[Vite](https://vitejs.dev/):** Ferramenta de build extremamente rápida para o desenvolvimento web moderno.
- **[Tailwind CSS](https://tailwindcss.com/):** Framework CSS utilitário para um design moderno e responsivo.
- **[React Router DOM](https://reactrouter.com/):** Gerenciamento de rotas e navegação da aplicação.
- **[Axios](https://axios-http.com/):** Cliente HTTP para consumo da API Backend.
- **[Phosphor Icons](https://phosphoricons.com/):** Biblioteca de ícones flexível e consistente.
- **[React Toastify](https://fkhadra.github.io/react-toastify/):** Exibição de alertas e notificações elegantes.

---

## 📦 Como instalar e rodar

### Pré-requisitos

- **Node.js** instalado (versão LTS recomendada).
- **Gerenciador de pacotes** (NPM ou Yarn).
- **Backend Rodando:** Este frontend necessita de uma API backend compatível.

### Passos para Instalação

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/LuizEduardoSC/Blog_Pessoal_React.git
    cd Blog_Pessoal_React
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Configuração de Ambiente:**
    Crie um arquivo `.env` na raiz do projeto e configure a URL da sua API:

    ```env
    VITE_API_URL=http://localhost:8080
    ```

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    # ou
    yarn dev
    ```
    Acesse a aplicação em `http://localhost:5173`.

---

## 🏗️ Estrutura de Pastas

```text
src/
├── components/ # Componentes reutilizáveis (Navbar, Footer, Forms)
├── contexts/   # Gerenciamento de estado global (Autenticação)
├── models/     # Interfaces e Modelos de dados (TypeScript)
├── pages/      # Telas principais da aplicação
├── services/   # Integração com a API (Axios)
└── utils/      # Funções utilitárias
```

---

_Desenvolvido com ❤️ como parte do aprendizado em desenvolvimento Web Full Stack._

# ✒️ Autores

- **Luiz Eduardo** - [LinkedIn](https://www.linkedin.com/in/luiz-eduardosc/)
