import { useTasksStore } from '@/hooks/useTasksStore';
import { Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';

export const TaskItems = () => {
	const tasks = useTasksStore((s) => s.getFiltered());
	const toggleTask = useTasksStore((s) => s.toggleTask);
	const removeTask = useTasksStore((s) => s.removeTask);
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
				<li key={t.id} className="flex items-start gap-3 p-3">
					<Checkbox
						checked={t.completed}
						onCheckedChange={() => toggleTask(t.id)}
						aria-label={`Marcar "${t.title}" como ${t.completed ? 'ativa' : 'concluída'}`}
					/>
					<div className="flex-1">
						<p className={`font-medium ${t.completed ? 'line-through opacity-60' : ''}`}>
							{t.title}
						</p>
						{t.description && (
							<p className="text-muted-foreground text-sm">{t.description}</p>
						)}
					</div>
					<Button
						variant="ghost"
						size="icon"
						aria-label={`Excluir "${t.title}"`}
						onClick={() => removeTask(t.id)}
					>
						<Trash2 className="size-4" />
					</Button>
				</li>
			))}
		</ul>
	);
};
