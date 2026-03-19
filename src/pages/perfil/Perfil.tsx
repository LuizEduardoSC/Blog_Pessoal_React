import { useContext, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { ToastAlerta } from '../../utils/ToastAlerts'
import { PencilSimple, UserCircle } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

function Perfil() {
    const navigate = useNavigate()
    const { usuario } = useContext(AuthContext)

    useEffect(() => {
        if (usuario.token === "") {
            ToastAlerta('Você precisa estar logado', "info")
            navigate("/login")
        }
    }, [usuario.token, navigate])

    return (
        <div className='container mx-auto mt-8 px-4'>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800'
            >
                {/* Header/Banner */}
                <div className='h-48 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative'>
                    <div className='absolute inset-0 bg-black/10 backdrop-blur-[2px]'></div>
                </div>

                <div className='px-8 pb-12 relative'>
                    {/* Profile Picture */}
                    <div className='flex flex-col md:flex-row md:items-end -mt-20 gap-6'>
                        <div className='relative'>
                            {usuario.foto ? (
                                <img
                                    className='rounded-full w-40 h-40 object-cover border-4 border-white dark:border-slate-900 shadow-xl'
                                    src={usuario.foto} 
                                    alt={`Foto de perfil de ${usuario.nome}`} 
                                />
                            ) : (
                                <div className='rounded-full w-40 h-40 bg-slate-200 dark:bg-slate-800 flex items-center justify-center border-4 border-white dark:border-slate-900 shadow-xl'>
                                    <UserCircle size={100} className='text-slate-400' />
                                </div>
                            )}
                        </div>

                        <div className='flex-1 mb-2'>
                            <h1 className='text-3xl font-bold text-slate-800 dark:text-white'>{usuario.nome}</h1>
                            <p className='text-slate-500 dark:text-slate-400 font-medium'>{usuario.usuario}</p>
                        </div>

                        <div className='md:mb-2'>
                            <Link 
                                to='/editarperfil'
                                className='flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-lg active:scale-95'
                            >
                                <PencilSimple size={20} weight='bold' />
                                Editar Perfil
                            </Link>
                        </div>
                    </div>

                    <hr className='my-8 border-slate-200 dark:border-slate-800' />

                    {/* Stats/Infos */}
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                        <div className='bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800'>
                            <h3 className='text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider mb-2'>Sobre</h3>
                            <p className='text-slate-700 dark:text-slate-300 leading-relaxed font-medium'>
                                {usuario.sobre || "Membro do Blog Pessoal. Compartilhando ideias e conhecimentos com a comunidade."}
                            </p>
                        </div>

                        <div className='bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800'>
                            <h3 className='text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider mb-2'>ID do Usuário</h3>
                            <p className='text-2xl font-mono font-bold text-indigo-500 dark:text-indigo-400'>
                                #{usuario.id}
                            </p>
                        </div>

                        <div className='bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800'>
                            <h3 className='text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider mb-2'>Status da Conta</h3>
                            <div className='flex items-center gap-2'>
                                <span className='w-3 h-3 bg-green-500 rounded-full animate-pulse'></span>
                                <p className='text-lg font-bold text-slate-700 dark:text-slate-300'>Ativa</p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default Perfil