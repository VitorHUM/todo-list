import { Button } from '@/components/ui/button';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
	Bold,
	Code2,
	Heading1,
	Heading2,
	Image as ImageIcon,
	Italic,
	Link as LinkIcon,
	List,
	ListOrdered,
	Text,
	Underline as UnderlineIcon,
} from 'lucide-react';
import { useCallback, useEffect, useRef } from 'react';

type RichTextEditorProps = {
	value?: string;
	onChange?: (html: string) => void;
	editable?: boolean;
	showToolbar?: boolean;
	'aria-describedby'?: string;
};

export const RichTextEditor = ({
	value,
	onChange,
	editable = true,
	showToolbar = true,
	...a11y
}: RichTextEditorProps) => {
	const fileInputRef = useRef<HTMLInputElement>(null);

	// Configuração do editor de texto Tiptap
	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				heading: { levels: [1, 2] },
				link: { openOnClick: true, autolink: true, linkOnPaste: true },
			}),
			Image.configure({ allowBase64: true }),
			Placeholder.configure({
				placeholder: 'Descrição da tarefa...',
			}),
		],
		editorProps: {
			attributes: {
				class:
					'max-w-none focus:outline-none min-h-[160px] max-h-[40vh] overflow-y-auto px-3 py-2 rounded-lg border bg-background',
				'aria-multiline': 'true',
				role: 'textbox',
			},
		},
		content: value || '',
		editable,
		onUpdate: ({ editor }) => {
			onChange?.(editor.getHTML());
		},
	});

	useEffect(() => {
		if (!editor) return;

		const current = editor.getHTML();

		if (value !== undefined && value !== current) {
			editor.commands.setContent(value, { emitUpdate: false });
		}
	}, [value, editor]);

	useEffect(() => {
		if (!editor) return;

		editor.setEditable(editable);
	}, [editable, editor]);

	// Função para adicionar uma imagem a partir de um arquivo
	const addImageFromFile = useCallback(
		(file: File) => {
			const reader = new FileReader();

			reader.onload = () => {
				const src = String(reader.result);
				editor?.chain().focus().setImage({ src, alt: file.name }).run();
			};

			reader.readAsDataURL(file);
		},
		[editor],
	);

	// Função para lidar com a mudança de arquivo (seleção de imagem)
	const onFileChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const f = event.target.files?.[0];

			if (f) addImageFromFile(f);

			event.target.value = '';
		},
		[addImageFromFile],
	);

	// Função para alternar o link no texto selecionado
	const toggleLink = useCallback(() => {
		if (!editor) return;

		const hasLink = editor.isActive('link');

		if (hasLink) {
			editor.chain().focus().unsetLink().run();
			return;
		}

		const href = window.prompt('URL do link:');

		if (!href) return;
		editor.chain().focus().extendMarkRange('link').setLink({ href }).run();
	}, [editor]);

	if (!editor) return null;

	return (
		<div className="space-y-2" data-readyonly={!editable}>
			{showToolbar && editable && (
				<div className="flex flex-wrap justify-between">
					<Button
						type="button"
						variant="outline"
						size="icon"
						onClick={() => editor.chain().focus().setParagraph().run()}
						aria-pressed={editor.isActive('paragraph')}
						className={`data-[state=on]:bg-primary-gray/40`}
						data-state={editor.isActive('paragraph') ? 'on' : 'off'}
						title="Parágrafo"
					>
						<Text size={14} />
					</Button>

					<Button
						type="button"
						variant="outline"
						size="icon"
						onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
						aria-pressed={editor.isActive('heading', { level: 1 })}
						className={`data-[state=on]:bg-primary-gray/40`}
						data-state={editor.isActive('heading', { level: 1 }) ? 'on' : 'off'}
						title="Heading 1"
					>
						<Heading1 size={14} />
					</Button>

					<Button
						type="button"
						variant="outline"
						size="icon"
						onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
						aria-pressed={editor.isActive('heading', { level: 2 })}
						className={`data-[state=on]:bg-primary-gray/40`}
						data-state={editor.isActive('heading', { level: 2 }) ? 'on' : 'off'}
						title="Heading 2"
					>
						<Heading2 size={14} />
					</Button>

					<Button
						type="button"
						variant="outline"
						size="icon"
						onClick={() => editor.chain().focus().toggleBold().run()}
						aria-pressed={editor.isActive('bold')}
						className={`data-[state=on]:bg-primary-gray/40`}
						data-state={editor.isActive('bold') ? 'on' : 'off'}
						title="Negrito"
					>
						<Bold size={14} />
					</Button>

					<Button
						type="button"
						variant="outline"
						size="icon"
						onClick={() => editor.chain().focus().toggleItalic().run()}
						aria-pressed={editor.isActive('italic')}
						className={`data-[state=on]:bg-primary-gray/40`}
						data-state={editor.isActive('italic') ? 'on' : 'off'}
						title="Itálico"
					>
						<Italic size={14} />
					</Button>

					<Button
						type="button"
						variant="outline"
						size="icon"
						onClick={() => editor.chain().focus().toggleUnderline().run()}
						aria-pressed={editor.isActive('underline')}
						className={`data-[state=on]:bg-primary-gray/40`}
						data-state={editor.isActive('underline') ? 'on' : 'off'}
						title="Sublinhado"
					>
						<UnderlineIcon size={14} />
					</Button>

					<Button
						type="button"
						variant="outline"
						size="icon"
						onClick={() => editor.chain().focus().toggleBulletList().run()}
						aria-pressed={editor.isActive('bulletList')}
						className={`data-[state=on]:bg-primary-gray/40`}
						data-state={editor.isActive('bulletList') ? 'on' : 'off'}
						title="Lista com marcadores"
					>
						<List size={14} />
					</Button>

					<Button
						type="button"
						variant="outline"
						size="icon"
						onClick={() => editor.chain().focus().toggleOrderedList().run()}
						aria-pressed={editor.isActive('orderedList')}
						className={`data-[state=on]:bg-primary-gray/40`}
						data-state={editor.isActive('orderedList') ? 'on' : 'off'}
						title="Lista numerada"
					>
						<ListOrdered size={14} />
					</Button>

					<Button
						type="button"
						variant="outline"
						size="icon"
						onClick={toggleLink}
						aria-pressed={editor.isActive('link')}
						className={`data-[state=on]:bg-primary-gray/40`}
						data-state={editor.isActive('link') ? 'on' : 'off'}
						title={editor.isActive('link') ? 'Remover link' : 'Adicionar link'}
					>
						<LinkIcon size={14} />
					</Button>

					<Button
						type="button"
						variant="outline"
						size="icon"
						onClick={() => editor.chain().focus().toggleCodeBlock().run()}
						aria-pressed={editor.isActive('codeBlock')}
						className={`data-[state=on]:bg-primary-gray/40`}
						data-state={editor.isActive('codeBlock') ? 'on' : 'off'}
						title="Bloco de código"
					>
						<Code2 size={14} />
					</Button>

					<Button
						type="button"
						variant="outline"
						size="icon"
						onClick={() => fileInputRef.current?.click()}
						title="Imagem"
					>
						<ImageIcon size={14} />
					</Button>

					<input
						ref={fileInputRef}
						type="file"
						accept="image/*"
						className="sr-only"
						onChange={onFileChange}
						aria-hidden
						tabIndex={-1}
					/>
				</div>
			)}

			<div {...a11y} className={`${!editable ? 'bg-muted/40' : ''}`}>
				<EditorContent editor={editor} />
			</div>
		</div>
	);
};
