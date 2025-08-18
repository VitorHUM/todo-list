export type Task = {
	id: string;
	title: string;
	description?: string;
	completed: boolean;
	createdAt: number;
};

export type TaskFilter = 'all' | 'active' | 'done';

export type TaskOrderBy = 'createdAtDesc' | 'createdAtAsc' | 'alphaAsc' | 'alphaDesc';
