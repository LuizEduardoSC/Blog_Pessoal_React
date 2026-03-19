import { Link } from 'react-router-dom'
import Tema from '../../../models/Tema'
import { motion } from 'framer-motion'

interface CardTemasProps {
    tema: Tema
}

function CardTema({ tema }: CardTemasProps) {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className='border flex flex-col rounded-2xl overflow-hidden justify-between dark:border-slate-700 transition-colors duration-300 shadow-md hover:shadow-xl dark:bg-slate-800'
        >
            <header className='py-3 px-6 bg-indigo-800 text-white font-bold text-xl dark:bg-slate-700 transition-colors uppercase tracking-wider'>
                Tema
            </header>
            <p className='p-8 text-2xl bg-slate-100 h-full dark:bg-slate-800 dark:text-slate-100 transition-colors font-medium text-slate-700'>
                {tema.descricao}
            </p>
            
            <div className="flex border-t dark:border-slate-700">
                <Link to={`/editartema/${tema.id}`}
                    className='w-full text-white bg-indigo-500 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500
                        flex items-center justify-center py-3 transition-colors font-bold'>
                    Editar
                </Link>

                <Link to={`/deletartema/${tema.id}`} className='text-white bg-red-500 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-500 w-full 
                    flex items-center justify-center py-3 transition-colors font-bold'>
                    Deletar
                </Link>
            </div>

        </motion.div>
    )
}

export default CardTema