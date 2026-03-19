import { Link } from 'react-router-dom'
import Tema from '../../../models/Tema'

interface CardTemasProps{
    tema: Tema
}

function CardTema({ tema }: CardTemasProps) {
    return (
        <div className='border flex flex-col rounded-2xl overflow-hidden justify-between dark:border-slate-700 transition-colors duration-300'>
            <header className='py-2 px-6 bg-indigo-800 text-white font-bold text-2xl dark:bg-slate-700 transition-colors'>Tema</header>
            <p className='p-8 text-3xl bg-slate-200 h-full dark:bg-slate-800 dark:text-slate-100 transition-colors'>{tema.descricao}</p>
            
            <div className="flex">
                <Link to={`/editartema/${tema.id}`}
                    className='w-full text-slate-100 bg-indigo-400 hover:bg-indigo-800 dark:bg-indigo-600 dark:hover:bg-indigo-500
                        flex items-center justify-center py-2 transition-colors'>
                    <button>Editar</button>
                </Link>

                <Link to={`/deletartema/${tema.id}`} className='text-slate-100 bg-red-400 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-500 w-full 
                    flex items-center justify-center transition-colors'>
                    <button>Deletar</button>
                </Link>
            </div>

        </div>
    )
}

export default CardTema