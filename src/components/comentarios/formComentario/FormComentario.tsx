import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { AuthContext } from '../../../contexts/AuthContext';
import Postagem from '../../../models/Postagem';
import { cadastrar } from '../../../services/Service';
import { ToastAlerta } from '../../../utils/ToastAlerts';

interface FormComentarioProps {
    postagem: Postagem;
    onComentarioAdded: () => void;
}

function FormComentario({ postagem, onComentarioAdded }: FormComentarioProps) {
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    const [isLoading, setIsLoading] = useState(false);
    const [texto, setTexto] = useState('');

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!texto.trim()) {
            ToastAlerta('Escreva algo antes de comentar!', 'erro');
            return;
        }

        setIsLoading(true);

        try {
            // No backend, o comentário costuma ser associado via Postagem e Usuario objetos
            await cadastrar('/comentarios', {
                texto,
                postagem: { id: postagem.id },
                usuario: { id: usuario.id }
            }, () => {}, {
                headers: { Authorization: token },
            });
            ToastAlerta('Comentário adicionado!', 'sucesso');
            setTexto('');
            onComentarioAdded();
        } catch (error) {
            if (error?.toString().includes('403')) {
                ToastAlerta('O token expirou, favor logar novamente', 'erro');
                handleLogout();
            } else {
                ToastAlerta('Erro ao adicionar comentário', 'erro');
            }
        }

        setIsLoading(false);
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">
            <div className="flex items-start gap-3">
                <img
                    src={usuario.foto || 'https://i.imgur.com/HeIi0wU.png'}
                    alt={usuario.nome}
                    className="h-10 w-10 rounded-full object-cover border-2 border-indigo-300 dark:border-indigo-500 flex-shrink-0 mt-1"
                />
                <textarea
                    value={texto}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setTexto(e.target.value)}
                    placeholder="Escreva um comentário..."
                    rows={3}
                    className="flex-1 p-3 rounded-xl border-2 border-indigo-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 resize-none focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-all"
                />
            </div>
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="bg-indigo-500 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white font-bold px-6 py-2 rounded-full flex items-center justify-center transition-colors shadow active:scale-95"
                >
                    {isLoading ? (
                        <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="20" visible />
                    ) : (
                        'Comentar'
                    )}
                </button>
            </div>
        </form>
    );
}

export default FormComentario;
