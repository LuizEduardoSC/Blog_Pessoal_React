import { Link } from 'react-router-dom'
import Postagem from '../../../models/Postagem'
import { motion } from 'framer-motion'
import { Heart } from '@phosphor-icons/react'
import { useContext, useState } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import { atualizar } from '../../../services/Service'

interface CardPostagensProps {
    postagem: Postagem
}

function CardPostagem({ postagem }: CardPostagensProps) {
    const { usuario } = useContext(AuthContext);
    const token = usuario.token;

    const [likes, setLikes] = useState(postagem.curtir || 0);
    const [isLiked, setIsLiked] = useState(false);

    async function curtirPostagem() {
        const novoLike = likes + 1;
        setLikes(novoLike);
        setIsLiked(true);

        try {
            await atualizar(`/postagens`, { ...postagem, curtir: novoLike }, () => {}, {
                headers: { Authorization: token },
            });
        } catch (error) {
            console.error("Erro ao curtir postagem:", error);
            // Reverter em caso de erro
            setLikes(likes);
            setIsLiked(false);
        }
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className='border-slate-900 border dark:border-slate-700 
            flex flex-col rounded-xl overflow-hidden justify-between dark:bg-slate-800 transition-colors duration-300 shadow-lg hover:shadow-2xl'
        >
            <div>
                <div className="flex w-full bg-indigo-400 dark:bg-slate-700 py-3 px-4 items-center gap-4 transition-colors">
                    <img src={postagem.usuario?.foto} className='h-12 w-12 rounded-full object-cover border-2 border-white' alt={postagem.usuario?.nome} />
                    <h3 className='text-lg font-bold text-white uppercase tracking-wider'>{postagem.usuario?.nome}</h3>
                </div>
                <div className='p-6 '>
                    <h4 className='text-xl font-bold uppercase mb-2 dark:text-slate-100'>{postagem.titulo}</h4>
                    <p className='text-slate-700 dark:text-slate-300 mb-4 line-clamp-3'>
                        {postagem.texto.replace(/<[^>]*>/g, '')}
                    </p>
                    
                    <div className='flex items-center gap-2 mb-2'>
                        <span className='px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs font-bold rounded uppercase'>
                            {postagem.tema?.descricao}
                        </span>
                    </div>

                    <p className='text-xs text-slate-500 dark:text-slate-400'>
                        {new Intl.DateTimeFormat(undefined, {
                            dateStyle: 'full',
                            timeStyle: 'short',
                        }).format(new Date(postagem.data))}
                    </p>
                </div>
            </div>
            <div className="flex border-t dark:border-slate-700">
                <Link to={`/postagem/${postagem.id}`}
                    className='w-full text-indigo-700 dark:text-indigo-300 bg-indigo-50 hover:bg-indigo-100 dark:bg-slate-700 dark:hover:bg-slate-600 flex items-center justify-center py-3 transition-colors font-bold text-sm'>
                    💬 Ver Post
                </Link>
                <button 
                    onClick={curtirPostagem}
                    className='w-full text-pink-600 dark:text-pink-400 bg-pink-50 hover:bg-pink-100 dark:bg-slate-700 dark:hover:bg-pink-900/20 flex items-center justify-center gap-2 py-3 transition-colors font-bold text-sm'
                >
                    <motion.div
                        animate={isLiked ? { scale: [1, 1.4, 1] } : {}}
                        transition={{ duration: 0.3 }}
                    >
                        <Heart size={20} weight={isLiked ? "fill" : "bold"} className={isLiked ? "text-pink-500" : ""} />
                    </motion.div>
                    {likes}
                </button>
                <Link to={`/editarpostagem/${postagem.id}`}
                    className='w-full text-white bg-indigo-500 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 flex items-center justify-center py-3 transition-colors font-bold text-sm'>
                    Editar
                </Link>
                <Link to={`/deletarpostagem/${postagem.id}`} 
                    className='text-white bg-red-500 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 w-full flex items-center justify-center py-3 transition-colors font-bold text-sm'>
                    Deletar
                </Link>
            </div>
        </motion.div>
    )
}

export default CardPostagem