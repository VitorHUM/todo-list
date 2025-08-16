import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTasksStore } from '@/hooks/useTasksStore';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useId, useRef, useState } from 'react';
import { shallow } from 'zustand/shallow';
import { RichTextEditor } from './RichTextEditor';

function validateTaskTitle(title: string, normalizedTitles: string[]) {
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
	const [error, setError] = useState<string | null>(null);
	const id = useId();
	const inputRef = useRef<HTMLInputElement>(null);

	const addTask = useTasksStore((s) => s.addTask);

	// Mantém a lista de títulos já normalizados
	const storedTitles = useTasksStore(
		(s) => s.tasks.map((t) => t.title.trim().toLowerCase()),
		shallow,
	);

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

	const handleClose = () => {
		setTitle('');
		setDescription('');
		setError(null);
		setOpen(false);
	};

	return (
		<section aria-labelledby="add" className="flex items-center justify-between">
			<h2 id="add" className="sr-only">
				Adicionar tarefa
			</h2>

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
				<DialogTrigger asChild>
					<Button
						type="button"
						className="bg-primary-green-dark hover:bg-primary-green-dark/80"
						size="lg"
					>
						Nova tarefa
					</Button>
				</DialogTrigger>

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
							<Label htmlFor={`${id}-input`}>Título</Label>

							<Input
								id={`${id}-input`}
								ref={inputRef}
								value={title}
								onChange={(e) => {
									setTitle(e.target.value);
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
								<Button type="button" variant="ghost" onClick={handleClose}>
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

			<h2 className="text-primary-gray text-sm">
				<time dateTime={new Date().toISOString()}>
					{new Intl.DateTimeFormat('pt-BR', {
						weekday: 'long',
						day: '2-digit',
						month: 'long',
						year: 'numeric',
						timeZone: 'America/Sao_Paulo',
					}).format(new Date())}
				</time>
			</h2>
		</section>
	);
};
