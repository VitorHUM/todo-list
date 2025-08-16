import type { Task, TaskFilter, TaskOrderBy } from '@/interfaces/task.interface';
import { createJSONStorage, persist } from 'zustand/middleware';
import { createWithEqualityFn } from 'zustand/traditional';

type TasksStore = {
	// Estados
	tasks: Task[];
	filter: TaskFilter;
	searchTerm: string;
	orderBy: TaskOrderBy;

	// Ações
	addTask: (title: string, description: string) => void;
	toggleTask: (id: string) => void;
	editTask: (id: string, title: string, description: string) => void;
	removeTask: (id: string) => void;
	removeCompleted: () => void;
	clearTasks: () => void;

	setFilter: (f: TaskFilter) => void;
	setSearchTerm: (term: string) => void;
	setOrderBy: (o: TaskOrderBy) => void;

	// Outros
	getCounts: () => { total: number; active: number; done: number };
	getFiltered: () => Task[];
};

function sortTasks(list: Task[], orderBy: TaskOrderBy) {
	const arr = [...list];

	switch (orderBy) {
		case 'createdAtAsc':
			return arr.sort((a, b) => a.createdAt - b.createdAt);
		case 'alphaAsc':
			return arr.sort((a, b) => a.title.localeCompare(b.title));
		case 'alphaDesc':
			return arr.sort((a, b) => b.title.localeCompare(a.title));
		case 'createdAtDesc':
		default:
			return arr.sort((a, b) => b.createdAt - a.createdAt);
	}
}

export const useTasksStore = createWithEqualityFn<TasksStore>()(
	persist(
		(set, get) => ({
			tasks: [],
			filter: 'all',
			searchTerm: '',
			orderBy: 'createdAtDesc',

			addTask: (title, description) =>
				set((s) => ({
					tasks: [
						{
							id: crypto.randomUUID(),
							title: title,
							description: description,
							completed: false,
							createdAt: Date.now(),
						},
						...s.tasks,
					],
				})),

			toggleTask: (id) =>
				set((s) => ({
					tasks: s.tasks.map((t) =>
						t.id === id ? { ...t, completed: !t.completed } : t,
					),
				})),

			editTask: (id, title, description) =>
				set((s) => ({
					tasks: s.tasks.map((t) => (t.id === id ? { ...t, title, description } : t)),
				})),

			removeTask: (id) => set((s) => ({ tasks: s.tasks.filter((t) => t.id !== id) })),

			removeCompleted: () => set((s) => ({ tasks: s.tasks.filter((t) => !t.completed) })),

			clearTasks: () => set(() => ({ tasks: [] })),

			setFilter: (filter) => set({ filter }),
			setSearchTerm: (searchTerm) => set({ searchTerm }),
			setOrderBy: (orderBy) => set({ orderBy }),

			getCounts: () => {
				const tasks = get().tasks;

				const active = tasks.reduce((n, t) => n + (t.completed ? 0 : 1), 0);

				const done = tasks.length - active;

				return { total: tasks.length, active, done };
			},

			getFiltered: () => {
				const { tasks, filter, searchTerm, orderBy } = get();

				const byStatus =
					filter === 'active'
						? tasks.filter((t) => !t.completed)
						: filter === 'done'
							? tasks.filter((t) => t.completed)
							: tasks;

				const bySearch = searchTerm.trim()
					? byStatus.filter((t) =>
							t.title.toLowerCase().includes(searchTerm.toLowerCase()),
						)
					: byStatus;

				return sortTasks(bySearch, orderBy);
			},
		}),
		{
			name: 'todo-list',
			storage: createJSONStorage(() => localStorage),
			partialize: (s) => ({
				tasks: s.tasks,
				filter: s.filter,
				searchTerm: s.searchTerm,
				orderBy: s.orderBy,
			}),
			version: 1,
		},
	),
);
