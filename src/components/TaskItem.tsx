import { useTasksStore } from '@/hooks/useTasksStore';
import type { Task } from '@/interfaces/task.interface';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Pencil, Trash2 } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { shallow } from 'zustand/shallow';
import { RichTextEditor } from './RichTextEditor';
import { validateTaskTitle } from './TaskForm';
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from './ui/alert-dialog';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

export const TaskItem = ({ id, title, description, completed, createdAt }: Task) => {
	const [open, setOpen] = useState<boolean>(false);
	const [mode, setMode] = useState<'view' | 'edit'>('view');
	const [formTitle, setFormTitle] = useState(title);
	const [formDesc, setFormDesc] = useState(description ?? '');
	const [error, setError] = useState<string | null>(null);
	const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const toggleTask = useTasksStore((s) => s.toggleTask);
	const removeTask = useTasksStore((s) => s.removeTask);
	const editTask = useTasksStore((s) => s.editTask);

	const titlesExcludingSelf = useTasksStore(
		(s) => s.tasks.filter((t) => t.id !== id).map((t) => t.title.trim().toLowerCase()),
		shallow,
	);

	useEffect(() => {
		if (!open) {
			setFormTitle(title);
			setFormDesc(description ?? '');
			setMode('view');
		}
	}, [open, title, description]);

	const openModal = (mode: 'view' | 'edit') => {
		setMode(mode);
		setOpen(true);
	};

	// Função para salvar as alterações da tarefa
	const handleSave = (event?: React.FormEvent) => {
		event?.preventDefault();

		const validationError = validateTaskTitle(formTitle, titlesExcludingSelf);
		if (validationError) {
			setError(validationError);
			inputRef.current?.focus();
			return;
		}

		editTask(id, formTitle, formDesc);
		handleClose();
	};

	// Função para fechar o modal e limpar o erro
	const handleClose = () => {
		setError(null);
		setOpen(false);
	};

	return (
		<>
			<li
				className="hover:bg-primary-purple-light/20 flex items-center gap-3 rounded-xl p-3 transition"
				role="listitem"
				onClick={() => openModal('view')}
			>
				<div
					onClick={(e) => e.stopPropagation()}
					onKeyDown={(e) => e.stopPropagation()}
					className="mt-1"
				>
					<Checkbox
						checked={completed}
						onCheckedChange={() => toggleTask(id)}
						className="cursor-pointer"
					/>
				</div>

				<Label
					className={`flex-1 cursor-pointer truncate text-left ${
						completed ? 'line-through opacity-60' : ''
					}`}
				>
					{title}
				</Label>

				<div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="outline"
								size="icon"
								aria-label="Editar tarefa"
								onClick={() => openModal('edit')}
							>
								<Pencil className="size-4" />
							</Button>
						</TooltipTrigger>

						<TooltipContent>
							<p>Editar tarefa</p>
						</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="outline"
								size="icon"
								aria-label="Excluir tarefa"
								onClick={() => setConfirmOpen(true)}
							>
								<Trash2 className="size-4" />
							</Button>
						</TooltipTrigger>

						<TooltipContent>
							<p>Excluir tarefa</p>
						</TooltipContent>
					</Tooltip>
				</div>
			</li>

			{/* Modal de visualização/edição da tarefa */}
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent onClick={(e) => e.stopPropagation()}>
					{mode === 'view' ? (
						<>
							<VisuallyHidden>
								<DialogTitle>{title}</DialogTitle>
							</VisuallyHidden>

							<DialogHeader>
								<DialogTitle>{title}</DialogTitle>

								{description && description != '<p></p>' ? (
									<>
										<RichTextEditor
											value={description}
											onChange={() => {}}
											editable={false}
											showToolbar={false}
											aria-describedby={`${id}-desc-view`}
										/>
									</>
								) : (
									<DialogDescription className="sr-only">
										Tarefa sem descrição
									</DialogDescription>
								)}
							</DialogHeader>

							<DialogFooter className="mt-2 flex flex-col items-center justify-between sm:justify-between">
								<p className="text-primary-gray text-xs">
									Tarefa criada em:
									<time dateTime={new Date(createdAt).toISOString()}>
										{` ${new Date(createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })} às ${new Date(createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', hour12: false })}`}
									</time>
								</p>

								<DialogClose asChild>
									<Button
										type="button"
										variant="secondary"
										onClick={handleClose}
										aria-label="Fechar"
									>
										Fechar
									</Button>
								</DialogClose>
							</DialogFooter>
						</>
					) : (
						<>
							<VisuallyHidden>
								<DialogTitle>Editar tarefa</DialogTitle>
							</VisuallyHidden>

							<DialogHeader>
								<DialogTitle>Editar tarefa</DialogTitle>

								<DialogDescription>Atualize o título e a descrição</DialogDescription>
							</DialogHeader>

							<form
								onSubmit={handleSave}
								className="grid gap-4"
								noValidate
								aria-labelledby={`${id}-title`}
							>
								<div className="grid gap-2">
									<Label htmlFor={`${id}-input`}>Título</Label>

									<Input
										id={`${id}-input`}
										ref={inputRef}
										value={formTitle}
										onChange={(e) => {
											setFormTitle(e.target.value);
											// Limpa erro ao digitar
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
									<Label htmlFor={`${id}-desc-field`}>Descrição</Label>

									<div id={`${id}-desc-field`}>
										<RichTextEditor
											value={formDesc}
											onChange={setFormDesc}
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
						</>
					)}
				</DialogContent>
			</Dialog>

			{/* Modal de confirmação de exclusão da tarefa */}
			<AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
				<AlertDialogContent onClick={(e) => e.stopPropagation()}>
					<AlertDialogHeader>
						<AlertDialogTitle>Excluir tarefa?</AlertDialogTitle>

						<AlertDialogDescription>
							Essa ação não pode ser desfeita. Excluir a tarefa
							<span className="font-medium"> “{title}”</span>?
						</AlertDialogDescription>
					</AlertDialogHeader>

					<AlertDialogFooter>
						<AlertDialogCancel onClick={() => setConfirmOpen(false)}>
							Cancelar
						</AlertDialogCancel>

						<Button
							type="button"
							variant="destructive"
							onClick={() => {
								removeTask(id);
								setConfirmOpen(false);
							}}
						>
							Excluir
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
};
