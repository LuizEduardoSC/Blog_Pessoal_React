import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import { buscar } from '../../../services/Service';
import { motion } from 'framer-motion';
import { Article, ChatText, ChartBar } from '@phosphor-icons/react';

interface DashboardData {
    totalPostagens: number;
    totalComentarios: number;
    temaDestaque: string;
}

function Dashboard() {
    const { usuario } = useContext(AuthContext);
    const [stats, setStats] = useState<DashboardData>({
        totalPostagens: 0,
        totalComentarios: 0,
        temaDestaque: 'Nenhum'
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (usuario.token && usuario.id) {
            buscar(`/usuarios/dashboard/${usuario.id}`, setStats, {
                headers: { Authorization: usuario.token }
            }).finally(() => setIsLoading(false));
        }
    }, [usuario.token, usuario.id]);

    if (isLoading) return null;

    return (
        <div className="mt-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 dark:text-white uppercase tracking-widest text-indigo-500">
                <ChartBar size={24} />
                Dashboard de Estatísticas
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Posts Card */}
                <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-indigo-50 dark:bg-slate-800/40 p-6 rounded-3xl border border-indigo-100 dark:border-slate-700 flex items-center gap-4 shadow-sm"
                >
                    <div className="p-3 bg-indigo-500 rounded-2xl text-white shadow-lg shadow-indigo-500/30">
                        <Article size={28} weight="bold" />
                    </div>
                    <div>
                        <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase">Total de Postagens</p>
                        <p className="text-2xl font-bold text-slate-800 dark:text-white">{stats.totalPostagens}</p>
                    </div>
                </motion.div>

                {/* Comments Card */}
                <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-purple-50 dark:bg-slate-800/40 p-6 rounded-3xl border border-purple-100 dark:border-slate-700 flex items-center gap-4 shadow-sm"
                >
                    <div className="p-3 bg-purple-500 rounded-2xl text-white shadow-lg shadow-purple-500/30">
                        <ChatText size={28} weight="bold" />
                    </div>
                    <div>
                        <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase">Comentários Feitos</p>
                        <p className="text-2xl font-bold text-slate-800 dark:text-white">{stats.totalComentarios}</p>
                    </div>
                </motion.div>

                {/* Top Theme Card */}
                <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="bg-pink-50 dark:bg-slate-800/40 p-6 rounded-3xl border border-pink-100 dark:border-slate-700 flex items-center gap-4 shadow-sm"
                >
                    <div className="p-3 bg-pink-500 rounded-2xl text-white shadow-lg shadow-pink-500/30">
                        <ChartBar size={28} weight="bold" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase">Tema Destaque</p>
                        <p className="text-xl font-bold text-slate-800 dark:text-white truncate">{stats.temaDestaque}</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default Dashboard;
