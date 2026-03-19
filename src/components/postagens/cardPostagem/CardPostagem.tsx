import { Link } from 'react-router-dom'
import Postagem from '../../../models/Postagem'
import { motion } from 'framer-motion'

interface CardPostagensProps {
    postagem: Postagem
}

function CardPostagem({ postagem }: CardPostagensProps) {
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
                    <p className='text-slate-700 dark:text-slate-300 mb-4 line-clamp-3'>{postagem.texto}</p>
                    
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