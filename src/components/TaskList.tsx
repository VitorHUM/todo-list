import { useTasksStore } from '@/hooks/useTasksStore';
import type { TaskFilter } from '@/interfaces/task.interface';
import { shallow } from 'zustand/shallow';
import { TaskItems } from './TaskItems';
import { Badge } from './ui/badge';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';

export const TaskList = () => {
	const filter = useTasksStore((s) => s.filter);
	const setFilter = useTasksStore((s) => s.setFilter);
	const { total, active, done } = useTasksStore((s) => s.getCounts(), shallow);

	return (
		<section aria-labelledby="list" className="space-y-3">
			<div className="flex flex-wrap items-center justify-between gap-2">
				<h2 id="list" className="text-lg font-semibold">
					Tarefas
				</h2>

				<div className="flex items-center gap-4">
					<div
						className="flex items-center gap-3"
						role="group"
						aria-label="Filtros de tarefas"
					>
						<ToggleGroup
							type="single"
							value={filter}
							onValueChange={(value) => value && setFilter(value as TaskFilter)}
							aria-label="Filtro"
							variant={'outline'}
						>
							<ToggleGroupItem value="all">
								Todas <Badge className="ml-2">{total}</Badge>
							</ToggleGroupItem>

							<ToggleGroupItem value="active">
								Ativas <Badge className="ml-2">{active}</Badge>
							</ToggleGroupItem>

							<ToggleGroupItem value="done" className="min-w-fit">
								Concluídas <Badge className="ml-2">{done}</Badge>
							</ToggleGroupItem>
						</ToggleGroup>
					</div>
				</div>
			</div>

			<TaskItems />
		</section>
	);
};
