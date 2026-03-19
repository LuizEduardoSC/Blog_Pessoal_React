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
            className="flex gap-4 p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all group"
        >
            <div className="relative flex-shrink-0">
                <img
                    src={comentario.usuario?.foto || 'https://i.imgur.com/HeIi0wU.png'}
                    alt={comentario.usuario?.nome}
                    className="h-12 w-12 rounded-full object-cover border-2 border-indigo-100 dark:border-slate-600 shadow-sm"
                />
                {/* Opcional: marcador de status aqui se quisermos */}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="font-bold text-indigo-700 dark:text-indigo-300 text-sm">
                        {comentario.usuario?.nome}
                    </span>
                    <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded-md">
                        {new Intl.DateTimeFormat('pt-BR', {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                        }).format(new Date(comentario.data))}
                    </span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-[15px] mt-2 leading-relaxed break-words font-medium">
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
