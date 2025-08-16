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
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useEffect, useId, useState } from 'react';
import { RichTextEditor } from './RichTextEditor';

type TaskPayload = {
	title: string;
	description: string;
};

type TaskFormProps = {
	onAdd?: (task: TaskPayload) => void;
};

export const TaskForm = ({ onAdd }: TaskFormProps) => {
	const [open, setOpen] = useState<boolean>(false);
	const [title, setTitle] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [touched, setTouched] = useState(false);
	const isTitleInvalid = touched && title.trim().length === 0;
	const id = useId();

	useEffect(() => {
		// Função para habilitar o atalho Ctrl+N para criar uma nova tarefa
		const handleHotKey = (event: KeyboardEvent) => {
			// Tratamento para evitar conflito com campos de formulário
			const target = event.target as HTMLElement | null;

			const isTyping =
				target &&
				(target.tagName === 'INPUT' ||
					target.tagName === 'TEXTAREA' ||
					target.getAttribute('contenteditable') === 'true');

			if (isTyping) return;

			if (event.key.toLowerCase() === 'n') {
				event.preventDefault();
				setOpen(true);
			}
		};

		window.addEventListener('keydown', handleHotKey);
		return () => window.removeEventListener('keydown', handleHotKey);
	}, []);

	const handleSave = (event?: React.FormEvent) => {
		event?.preventDefault();

		const t = title.trim();

		if (!t) return;

		onAdd?.({ title: t, description: description });

		handleClose();
	};

	const handleClose = () => {
		setTitle('');
		setDescription('');
		setOpen(false);
		setTouched(false);
	};

	return (
		<section aria-labelledby="add">
			<h2 id="add" className="sr-only">
				Adicionar tarefa
			</h2>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button
						type="button"
						aria-keyshortcuts="n"
						className="bg-primary-purple hover:bg-primary-purple/80"
						size={'lg'}
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
							Preencha o título e a descrição da tarefa.
						</DialogDescription>
					</DialogHeader>

					<form
						onSubmit={handleSave}
						className="grid gap-4"
						noValidate
						aria-labelledby={`${id}-title`}
					>
						<div className="grid gap-2">
							<Label htmlFor={`${id}-input`} className="">
								Título
							</Label>

							<Input
								id={`${id}-input`}
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								onBlur={() => setTouched(true)}
								placeholder="Implementar tela de login"
								aria-invalid={isTitleInvalid || undefined}
								required
							/>
						</div>

						<div className="grid gap-2">
							<Label htmlFor={`${id}-desc`}>Descrição</Label>

							<div id={`${id}-desc`}>
								<RichTextEditor
									value={description}
									onChange={setDescription}
									aria-describedby={`${id}-desc-hint`}
									placeholder="Implementar a tela de login com autenticação via API"
								/>

								<p id={`${id}-desc-hint`} className="sr-only">
									Use a barra de ferramentas para formatar e inserir imagens.
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
								disabled={isTitleInvalid}
								className="bg-primary-green-dark hover:bg-primary-green-dark/80"
							>
								Salvar
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</section>
	);
};
