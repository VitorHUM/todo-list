## 📃 To-Do List (Lista de Tarefas)

[![ToDo List Screenshot][app-screenshot]](https://i.imgur.com/edzFZ8d.png)

Aplicação de lista de tarefas focada em UX, acessibilidade e simplicidade.
Permite criar, visualizar, editar e excluir tarefas, persistência local de dados, entre outras funcionalidades.

## ⚒️ Stack

Vite + React = DX rápida, HMR estável, configuração simples e leve.
<br/>
TypeScript = Tipagem segura, escalabilidade e refatorações confiáveis.
<br/>
Zustand = Estado global minimalista e direto, com persistência fácil no localStorage.
<br/>
Tailwind CSS = Utilitários concisos, design consistente e fácil de manter.
<br/>
shadcn/ui = Componentes acessíveis, composáveis e sem lock-in de estilo.

- [![Vite][Vite]][Vite-url]
- [![React.js][React.js]][React-url]
- [![TypeScript][TypeScript]][TypeScript-url]
- [![Zustand][Zustand]][Zustand-url]
- [![Tailwindcss][Tailwindcss]][Tailwindcss-url]
- [![shadcn/ui][shadcn/ui]][shadcn/ui-url]

## ‼️ Pré-requisitos

- [![Node.js][Node.js]][Node-url]
- Gerenciador de pacotes como "[npm](https://www.npmjs.com/)".

## ⚙️ Instalação

1. Clonar o repositório
   ```sh
   git clone https://github.com/VitorHUM/todo-list
   ```
2. Instalar os pacotes
   ```sh
   npm install
   ```
3. Iniciar a aplicação

   ```sh
   npm run dev
   ```

   Pronto, se tudo deu certo sua aplicação já vai estar executando localmente.

## 🎯 Funcionalidades

<details>
  <summary><b>Núcleo de tarefas</b></summary>
  <ul>
    <li>CRUD completo: criação, leitura (modal), edição (modal) e exclusão (com confirmação).</li>
    <li>Conclusão rápida: alternância de status via checkbox, sem abrir modal.</li>
    <li>Rich text real: descrição com formatação (títulos, listas, ênfases, imagens). Em visualização, o conteúdo é renderizado em modo somente leitura, preservando a formatação e suportando imagens (incluindo base64).</a></li>
  </ul>
</details>

<details>
  <summary><b>Busca, filtros e ordenação</b></summary>
  <ul>
    <li>Busca incremental por título, com limpeza rápida (botão “X” e tecla Esc).</li>
    <li>Filtros por status: Todas, Ativas e Concluídas, com contadores em tempo real.</li>
    <li>Ordenação configurável: mais recentes, mais antigas, título A–Z e Z–A.</a></li>
  </ul>
</details>

<details>
  <summary><b>Validações e UX de edição</b></summary>
  <ul>
    <li>Título obrigatório e único: impede duplicidade entre tarefas.</li>
    <li>Edição inteligente: ao editar, é permitido manter o mesmo título da própria tarefa (não é considerado duplicado); alterar apenas a descrição é suportado.</li>
    <li>Fluxo seguro de exclusão: diálogos de confirmação para excluir individualmente, todas, ou apenas as concluídas; botões desabilitam quando não há itens elegíveis.</a></li>
  </ul>
</details>

<details>
  <summary><b>Interface e design</b></summary>
  <ul>
    <li>Componentes consistentes e acessíveis para modais, diálogos, tooltips, inputs e botões.</li>
    <li>Layout responsivo e visual limpo, com microinterações discretas.</li>
    <li>Semântica ARIA, mensagens de status e foco visível.</li>
  </ul>
</details>

<details>
  <summary><b>Estado, persistência e performance</b></summary>
  <ul>
    <li>Estado global centralizado com seletores derivados (contagens, lista filtrada/ordenada).</li>
    <li>Persistência local: tarefas e preferências gravadas no navegador (localStorage), sem backend.</li>
    <li>Renderização eficiente: seleção de fatias específicas do estado para evitar re-renderizações desnecessárias.</a></li>
  </ul>
</details>

<details>
  <summary><b>Privacidade e confiabilidade</b></summary>
  <ul>
    <li>Dados locais: nenhuma tarefa sai do seu dispositivo.</li>
    <li>Tolerante a offline: funciona mesmo sem conexão, pois tudo está no navegador.</li>
  </ul>
</details>

## 👀 Utilização

- Criar tarefa: clique em Nova tarefa, preencha o título (obrigatório e único) e, se quiser, a descrição com formatação (negrito, listas, imagens...). Clique em Salvar.

- Visualizar detalhes: clique no título ou em qualquer parte da linha da tarefa. Uma janela abre em modo de leitura mostrando a descrição formatada e a data/hora de criação. Clique em Fechar.

- Editar tarefa: clique no ícone de lápis. Na janela, altere o título/descrição e Salve. Se mudar só a descrição, o título original é mantido.

- Concluir/reativar: marque/desmarque a caixinha à esquerda da tarefa.

- Filtrar: use "Todas, Ativas ou Concluídas" para ver apenas o que precisa.

- Buscar por título: use o campo "Buscar por título". Clique no X para limpar a busca.

- Ordenar: no seletor "Ordenar por", escolha Mais recentes, Mais antigas, Título A–Z ou Título Z–A.

- Excluir uma tarefa: clique no ícone de lixeira e confirme.

- Excluir tarefas concluídas: clique em "Excluir tarefas CONCLUÍDAS" e confirme. (Desabilitado se não houver tarefas concluídas.)

- Excluir todas tarefas: clique em "Excluir tarefas CONCLUÍDAS" e confirme. (Desabilitado se não houver tarefas.)

- Onde os dados ficam salvos?
  <br/>
  Tudo é salvo localmente no seu navegador (sem login). Se limpar os dados do navegador, as tarefas serão removidas.

## 🧭 Roadmap

- [ ] Adicionar Dark Mode
- [ ] Adicionar atalhos de teclados (Hotkeys)
- [ ] Implementar login e autenticação
- [ ] Internacionalização

[app-screenshot]: https://i.imgur.com/edzFZ8d.png
[Vite]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white
[Vite-url]: https://vite.dev/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[TypeScript]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Zustand]: https://img.shields.io/badge/zustand-602c3c?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAA8FBMVEVHcExXQzpKQDlFV16lpqyGh4tPPTdWT0weHRU7LRZGQzmxYjlaTkZsbmywVyxtXDSFhISXm6WWpcaytb6bm56gprY0LiiXmp2prLamsMa0XS42MSxkTUVDSkuyYzGihXdDV2GprbmedVxaRD1kTUWUdGFGOCN4a2OfpbI0SFFAMSddTkbCc0dWQiGFRypXQyJUQCBcTTWviDVXQyJcUDjlqCWxjkG+hBTiohtURD6lr8lORTtDVVZmPyxwSipaRSJDOzaWpsyYqMyYqM2dq8tPOjBERTs6QUKTcCeKaCJvViZdSDK4iSngoiDvqx7KkRuGEi1hAAAAOXRSTlMApZ78cB8hCAMQO/j/FOH4KlT1wFfJTjaY6SxtVexFn3Tn2sN6d671mVuJ+/PPN9CT6TfpS4C9jJaVLRihAAAAi0lEQVQIHXXBxRKCUAAF0Es/QMDubsVuGrv1///GBQ4bx3PwgwC8gFCRohs8QrQV0ZtKOZ9JcgBmU8MwqFa9kjNTUWB58f2jPOjU9juTBTbPq+vIar972MZjwPr1uDvqCFw2wQpQVm/t7Oo9gAgAFtrtZNtMFQFp7nkWU5IQECfjYbuQFvBFRJHgjw9L0A80UmaGpAAAAABJRU5ErkJggg==
[Zustand-url]: https://zustand-demo.pmnd.rs/
[Tailwindcss]: https://img.shields.io/badge/Tailwind_CSS-grey?style=for-the-badge&logo=tailwind-css&logoColor=38B2AC
[Tailwindcss-url]: https://tailwindcss.com/
[shadcn/ui]: https://img.shields.io/badge/shadcn%2Fui-000?logo=shadcnui&logoColor=fff&style=for-the-badge
[shadcn/ui-url]: https://ui.shadcn.com/
[Node.js]: https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white
[Node-url]: https://nodejs.org/
