import { useCallback, useContext, useEffect, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { motion } from 'framer-motion';
import { AuthContext } from '../../../contexts/AuthContext';
import Comentario from '../../../models/Comentario';
import Postagem from '../../../models/Postagem';
import { buscar } from '../../../services/Service';
import CardComentario from '../cardComentario/CardComentario';
import FormComentario from '../formComentario/FormComentario';

interface ListaComentariosProps {
    postagem: Postagem;
}

function ListaComentarios({ postagem }: ListaComentariosProps) {
    const { usuario } = useContext(AuthContext);
    const token = usuario.token;

    const [comentarios, setComentarios] = useState<Comentario[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const buscarComentarios = useCallback(async () => {
        if (!postagem.id) return;
        setIsLoading(true);
        try {
            await buscar(`/comentarios/postagem/${postagem.id}`, setComentarios, {
                headers: { Authorization: token },
            });
        } catch (error) {
            console.error("Erro ao buscar comentários:", error);
        }
        setIsLoading(false);
    }, [postagem.id, token]);

    useEffect(() => {
        buscarComentarios();
    }, [buscarComentarios]);

    return (
        <section className="mt-8">
            <h3 className="text-xl font-bold mb-4 dark:text-slate-100 border-b pb-2 dark:border-slate-700">
                💬 Comentários ({comentarios.length})
            </h3>

            <FormComentario postagem={postagem} onComentarioAdded={buscarComentarios} />

            <div className="flex flex-col gap-4 mt-8">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-10 opacity-70">
                        <RotatingLines
                            strokeColor="#6366f1"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="40"
                            visible
                        />
                        <p className="mt-2 text-sm font-medium text-slate-500 animate-pulse">Carregando comentários...</p>
                    </div>
                ) : comentarios.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12 px-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-dashed border-slate-200 dark:border-slate-700"
                    >
                        <p className="text-slate-400 dark:text-slate-500 font-medium">
                            Nenhum comentário ainda. Seja o primeiro a participar! 🎉
                        </p>
                    </motion.div>
                ) : (
                    comentarios.map((comentario) => (
                        <CardComentario key={comentario.id} comentario={comentario} />
                    ))
                )}
            </div>
        </section>
    );
}

export default ListaComentarios;
