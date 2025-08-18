import { useTasksStore } from '@/hooks/useTasksStore';
import type { TaskFilter, TaskOrderBy } from '@/types/task.type';
import { Search, X } from 'lucide-react';
import { shallow } from 'zustand/shallow';
import { TaskItems } from './TaskItems';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';

export const TaskList = () => {
	const filter = useTasksStore((s) => s.filter);
	const setFilter = useTasksStore((s) => s.setFilter);

	const orderBy = useTasksStore((s) => s.orderBy);
	const setOrderBy = useTasksStore((s) => s.setOrderBy);

	const searchTerm = useTasksStore((s) => s.searchTerm);
	const setSearchTerm = useTasksStore((s) => s.setSearchTerm);

	const { total, active, done } = useTasksStore((s) => s.getCounts(), shallow);

	return (
		<section aria-labelledby="list" className="space-y-3">
			<div className="flex flex-wrap items-center justify-between gap-2">
				<h2 id="list" className="text-lg font-semibold">
					Tarefas
				</h2>

				<div className="flex flex-wrap items-center gap-4">
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
							variant="outline"
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

					<div
						role="search"
						aria-label="Buscar tarefas"
						className="relative w-40 sm:w-48"
					>
						<Label htmlFor="task-search" className="sr-only">
							Buscar por título
						</Label>

						<Search
							className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 opacity-60"
							aria-hidden
						/>

						<Input
							id="task-search"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							placeholder="Buscar por título..."
							className="px-8"
							aria-describedby="task-search-hint"
						/>

						{searchTerm && (
							<Button
								type="button"
								variant="ghost"
								size="icon"
								className="absolute right-0 top-1/2 -translate-y-1/2"
								aria-label="Limpar busca"
								onClick={() => setSearchTerm('')}
							>
								<X className="size-4" />
							</Button>
						)}

						<p id="task-search-hint" className="sr-only">
							Digite para filtrar as tarefas pelo título. Pressione Escape para limpar.
						</p>
					</div>

					<div className="flex items-center gap-2">
						<Label htmlFor="order-by" className="text-muted-foreground text-sm">
							Ordenar por:
						</Label>

						<Select
							value={orderBy}
							onValueChange={(value) => setOrderBy(value as TaskOrderBy)}
						>
							<SelectTrigger id="order-by" className="w-40">
								<SelectValue placeholder="Ordenar por:" />
							</SelectTrigger>

							<SelectContent>
								<SelectItem value="createdAtDesc">Mais recentes</SelectItem>
								<SelectItem value="createdAtAsc">Mais antigas</SelectItem>
								<SelectItem value="alphaAsc">Título A-Z</SelectItem>
								<SelectItem value="alphaDesc">Título Z-A</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
			</div>

			<TaskItems />
		</section>
	);
};
