import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash } from '@phosphor-icons/react';
import { AuthContext } from '../../../contexts/AuthContext';
import Comentario from '../../../models/Comentario';

interface CardComentarioProps {
    comentario: Comentario;
}

function CardComentario({ comentario }: CardComentarioProps) {
    const { usuario } = useContext(AuthContext);
    const isOwner = usuario.id === comentario.usuario?.id;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3 p-4 rounded-xl bg-slate-100 dark:bg-slate-700 transition-colors"
        >
            <img
                src={comentario.usuario?.foto || 'https://i.imgur.com/HeIi0wU.png'}
                alt={comentario.usuario?.nome}
                className="h-10 w-10 rounded-full object-cover border-2 border-indigo-300 dark:border-indigo-500 flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="font-bold text-indigo-700 dark:text-indigo-300 text-sm">
                        {comentario.usuario?.nome}
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-400">
                        {new Intl.DateTimeFormat('pt-BR', {
                            dateStyle: 'short',
                            timeStyle: 'short',
                        }).format(new Date(comentario.data))}
                    </span>
                </div>
                <p className="text-slate-700 dark:text-slate-200 text-sm mt-1 break-words">
                    {comentario.texto}
                </p>
            </div>
            {isOwner && (
                <Link
                    to={`/deletarcomentario/${comentario.id}`}
                    className="text-red-400 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors flex-shrink-0 self-start mt-1"
                    title="Excluir comentário"
                >
                    <Trash size={18} />
                </Link>
            )}
        </motion.div>
    );
}

export default CardComentario;
