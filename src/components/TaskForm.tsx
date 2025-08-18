import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTasksStore } from '@/hooks/useTasksStore';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Check, Plus, Trash2 } from 'lucide-react';
import { useId, useRef, useState } from 'react';
import { shallow } from 'zustand/shallow';
import { RichTextEditor } from './RichTextEditor';
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from './ui/alert-dialog';

// Função para validar o título da tarefa
export function validateTaskTitle(title: string, normalizedTitles: string[]) {
	const t = title.trim();

	if (t.length === 0) return 'Informe um título para a tarefa';

	const isDuplicate = normalizedTitles.includes(t.toLowerCase());

	if (isDuplicate) return 'Já existe uma tarefa com esse título';

	return null;
}

export const TaskForm = () => {
	const [open, setOpen] = useState<boolean>(false);
	const [title, setTitle] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const addTask = useTasksStore((s) => s.addTask);
	const [error, setError] = useState<string | null>(null);

	const [openRemoveCompleted, setOpenRemoveCompleted] = useState<boolean>(false);
	const [openClearTask, setOpenClearTask] = useState<boolean>(false);
	const { total, done } = useTasksStore((s) => s.getCounts());
	const removeCompleted = useTasksStore((s) => s.removeCompleted);
	const clearTasks = useTasksStore((s) => s.clearTasks);

	const id = useId();
	const inputRef = useRef<HTMLInputElement>(null);

	const storedTitles = useTasksStore(
		(s) => s.tasks.map((t) => t.title.trim().toLowerCase()),
		shallow,
	);

	// Função para lidar com o envio do formulário
	const handleSave = (event?: React.FormEvent) => {
		event?.preventDefault();

		const validationError = validateTaskTitle(title, storedTitles);
		if (validationError) {
			setError(validationError);
			inputRef.current?.focus();
			return;
		}

		addTask(title.trim(), description);

		handleClose();
	};

	// Função para fechar o modal e limpar os campos
	const handleClose = () => {
		setTitle('');
		setDescription('');
		setError(null);
		setOpen(false);
	};

	return (
		<section aria-labelledby="add" className="flex items-center justify-between">
			<div className="flex items-center gap-4">
				<Button
					type="button"
					size="lg"
					className="bg-primary-green-dark hover:bg-primary-green-dark/80"
					onClick={() => setOpen(true)}
				>
					<Plus className="size-4" />
					Nova tarefa
				</Button>

				<Button
					type="button"
					size="lg"
					className="bg-primary-purple hover:bg-primary-purple/80"
					disabled={done === 0}
					onClick={() => setOpenRemoveCompleted(true)}
					aria-disabled={done === 0 || undefined}
				>
					<Check className="size-4" />
					Excluir tarefas CONCLUÍDAS
				</Button>

				<Button
					type="button"
					size="lg"
					variant="destructive"
					disabled={total === 0}
					onClick={() => setOpenClearTask(true)}
					aria-disabled={total === 0 || undefined}
				>
					<Trash2 className="size-4" />
					Excluir TODAS tarefas
				</Button>
			</div>

			{/* Modal para adicionar tarefa */}
			<Dialog
				open={open}
				onOpenChange={(next) => {
					setOpen(next);
					if (!next) {
						setError(null);
						setTitle('');
						setDescription('');
					}
				}}
			>
				<DialogContent aria-describedby={`${id}-desc`}>
					<VisuallyHidden>
						<DialogTitle>Adicionar tarefa</DialogTitle>
					</VisuallyHidden>

					<DialogHeader>
						<DialogTitle id={`${id}-title`}>Adicionar tarefa</DialogTitle>

						<DialogDescription id={`${id}-desc`}>
							Preencha o título e a descrição da tarefa
						</DialogDescription>
					</DialogHeader>

					<form
						onSubmit={handleSave}
						className="grid gap-4"
						noValidate
						aria-labelledby={`${id}-title`}
					>
						<div className="grid gap-2">
							<Label htmlFor={`${id}-input`} className="text-sm">
								Título
							</Label>

							<Input
								id={`${id}-input`}
								ref={inputRef}
								value={title}
								onChange={(e) => {
									setTitle(e.target.value);
									if (error) setError(null);
								}}
								placeholder="Título da tarefa"
								aria-invalid={error ? true : undefined}
								aria-describedby={error ? `${id}-title-error` : undefined}
								required
							/>

							{error && (
								<p
									id={`${id}-title-error`}
									className="text-destructive text-sm"
									role="alert"
								>
									{error}
								</p>
							)}
						</div>

						<div className="grid gap-2">
							<Label htmlFor={`${id}-desc-field`} className="text-sm">
								Descrição
							</Label>

							<div id={`${id}-desc-field`}>
								<RichTextEditor
									value={description}
									onChange={setDescription}
									aria-describedby={`${id}-desc-hint`}
								/>
								<p id={`${id}-desc-hint`} className="sr-only">
									Use a barra de ferramentas para formatar e inserir imagens
								</p>
							</div>
						</div>

						<DialogFooter className="mt-2">
							<DialogClose asChild>
								<Button type="button" variant="secondary" onClick={handleClose}>
									Cancelar
								</Button>
							</DialogClose>

							<Button
								type="submit"
								className="bg-primary-green-dark hover:bg-primary-green-dark/80"
							>
								Salvar
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>

			{/* Modal para excluir tarefas concluídas */}
			<AlertDialog open={openRemoveCompleted} onOpenChange={setOpenRemoveCompleted}>
				<AlertDialogContent onClick={(e) => e.stopPropagation()}>
					<AlertDialogHeader>
						<AlertDialogTitle>Excluir tarefas CONCLUÍDAS?</AlertDialogTitle>

						<AlertDialogDescription>
							{done > 0
								? `Essa ação apagará ${done} ${done === 1 ? 'tarefa' : 'tarefas'} e não poderá ser desfeita`
								: 'Nenhuma tarefa concluída para excluir'}
						</AlertDialogDescription>
					</AlertDialogHeader>

					<AlertDialogFooter>
						<AlertDialogCancel onClick={() => setOpenRemoveCompleted(false)}>
							Cancelar
						</AlertDialogCancel>

						<Button
							type="button"
							variant="destructive"
							onClick={() => {
								removeCompleted();
								setOpenRemoveCompleted(false);
							}}
						>
							Excluir CONCLUÍDAS
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			{/* Modal para excluir todas tarefas */}
			<AlertDialog open={openClearTask} onOpenChange={setOpenClearTask}>
				<AlertDialogContent onClick={(e) => e.stopPropagation()}>
					<AlertDialogHeader>
						<AlertDialogTitle>Excluir TODAS tarefas?</AlertDialogTitle>

						<AlertDialogDescription>
							{total > 0
								? `Essa ação apagará ${total} ${total === 1 ? 'tarefa' : 'tarefas'} e não poderá ser desfeita`
								: 'Nenhuma tarefa para excluir'}
						</AlertDialogDescription>
					</AlertDialogHeader>

					<AlertDialogFooter>
						<AlertDialogCancel onClick={() => setOpenClearTask(false)}>
							Cancelar
						</AlertDialogCancel>

						<Button
							type="button"
							variant="destructive"
							onClick={() => {
								clearTasks();
								setOpenClearTask(false);
							}}
						>
							Excluir TODAS
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</section>
	);
};
