import { useTasksStore } from '@/hooks/useTasksStore';
import { TaskItem } from './TaskItem';

export const TaskItems = () => {
	const tasks = useTasksStore((s) => s.getFiltered());
	const { filter } = useTasksStore((s) => s);

	if (tasks.length <= 0) {
		return (
			<p className="text-primary-gray text-sm" role="status" aria-live="polite">
				{filter === 'all'
					? 'Nenhuma tarefa encontrada'
					: filter === 'active'
						? 'Nenhuma tarefa ativa'
						: 'Nenhuma tarefa concluída'}
			</p>
		);
	}

	return (
		<ul
			role="list"
			className="border-primary-purple divide-primary-purple-light divide-y rounded-2xl border"
		>
			{tasks.map((t) => (
				<TaskItem key={t.id} {...t} />
			))}
		</ul>
	);
};
