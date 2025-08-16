ToDo List — React + TypeScript + Vite + Zustand + shadcn/ui + Tiptap

Aplicação de tarefas focada em UX, acessibilidade e organização de código.
Permite criar, visualizar, editar e excluir tarefas, com descrição em rich text, confirmação de exclusão, persistência local e validação de título duplicado (com exceção da própria tarefa ao editar).

Stack principal: React + TypeScript + Vite, Zustand (persistência em localStorage), Tailwind CSS, shadcn/ui (Radix), Tiptap (Rich Text), lucide-react (ícones).

✨ Funcionalidades

CRUD de tarefas

Criar tarefa com título e descrição rich text (Tiptap).

Visualização em modal read-only (sem toolbar).

Edição em modal (com toolbar).

Excluir com confirmação (AlertDialog do shadcn/ui).

Checklist

Marcar como concluída direto pelo checkbox (não abre modal).

Validação de títulos

Impede títulos duplicados ao criar/editar.

Exceção ao editar: se o título não mudou (mesmo id), permite salvar apenas a descrição.

Filtros, busca e ordenação

Filtro: all | active | done.

Busca por título.

Ordenação: createdAtDesc | createdAtAsc | alphaAsc | alphaDesc.

Persistência

Estado e preferências persistidos em localStorage (Zustand + persist).

Acessibilidade

ARIA labels, aria-live, foco visível, semântica correta.

🧱 Tecnologias & Motivações
Tecnologia Por que
Vite (React + TS) DX rápida, HMR estável, config simples e leve.
TypeScript Tipagem segura, escalabilidade e refatorações confiáveis.
Zustand (+ persist) Estado global minimalista e direto, com persistência fácil no localStorage.
Tailwind CSS Utilitários concisos, design consistente e fácil de manter.
shadcn/ui (Radix) Componentes acessíveis, composáveis e sem lock-in de estilo.
Tiptap (StarterKit + Image) Rich text moderno, extensível e controlado para edição e visualização.
lucide-react Ícones leves e elegantes, de fácil composição.

Nota sobre imagens no Rich Text:
A extensão @tiptap/extension-image está configurada com allowBase64: true, permitindo renderização de imagens base64 tanto na edição quanto na visualização (read-only).

📂 Estrutura do projeto (resumo)
src/
components/
TaskItem.tsx # Item da lista (view/edit, confirmação de exclusão)
TaskItems.tsx # Lista de tarefas
RichTextEditor.tsx # Tiptap (edição e visualização read-only)
ui/ # Componentes shadcn/ui (Button, Dialog, AlertDialog, etc.)
hooks/
useTasksStore.ts # Zustand + persist
interfaces/
task.interface.ts # Task, TaskItemProps (Pick<Task,...>), filtros e ordenações
styles/
globals.css # Tailwind base
main.tsx / App.tsx # Bootstrap da aplicação

🧠 Estado & Regra de Negócio

Zustand store expõe:

type TasksStore = {
tasks: Task[];
filter: 'all' | 'active' | 'done';
searchTerm: string;
orderBy: 'createdAtDesc' | 'createdAtAsc' | 'alphaAsc' | 'alphaDesc';

addTask(title: string, description: string): void;
toggleTask(id: string): void;
editTask(id: string, title: string, description: string): void;
removeTask(id: string): void;
removeCompleted(): void;
clearTasks(): void;

setFilter(f): void;
setSearchTerm(term): void;
setOrderBy(o): void;

getCounts(): { total: number; active: number; done: number };
getFiltered(): Task[];
};

Persistência: persist + createJSONStorage(() => localStorage).

Ordenação: em função dedicada (sortTasks).

Validação de duplicados:

Criação/edição usa uma função validateTaskTitle.

Ao editar, a lista de títulos usada na validação exclui a própria task (filter(t => t.id !== id)), permitindo salvar se apenas a descrição mudou.

🖊️ Rich Text (Tiptap)

Edição: editable={true}, showToolbar={true}.

Visualização: editable={false}, showToolbar={false} → evita dangerouslySetInnerHTML e mantém formatação.

Imagens: Image.configure({ allowBase64: true, HTMLAttributes: { loading: 'lazy', decoding: 'async', class: 'max-w-full h-auto rounded-md', referrerpolicy: 'no-referrer' } }).

Se você usa Content-Security-Policy, inclua:
img-src 'self' data: https:;
para permitir imagens base64 (data:).

⚙️ Requisitos

Node.js ≥ 20.11

Gerenciador de pacotes: pnpm (recomendado), ou npm/yarn

▶️ Como rodar (Vite)

Clonar & instalar dependências

git clone <seu-repo>.git
cd <seu-repo>
pnpm install

# ou: npm install / yarn

Ambiente de desenvolvimento

pnpm dev

# ou: npm run dev / yarn dev

Acesse em: http://localhost:5173 (ou porta indicada no terminal).

Build de produção

pnpm build

# ou: npm run build / yarn build

Preview do build

pnpm preview

# ou: npm run preview / yarn preview
