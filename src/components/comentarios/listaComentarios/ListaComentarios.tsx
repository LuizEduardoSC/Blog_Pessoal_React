import { useCallback, useContext, useEffect, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
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

            <div className="flex flex-col gap-3 mt-6">
                {isLoading ? (
                    <div className="flex justify-center py-8">
                        <RotatingLines
                            strokeColor="#6366f1"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="40"
                            visible
                        />
                    </div>
                ) : comentarios.length === 0 ? (
                    <p className="text-center text-slate-400 dark:text-slate-500 py-8">
                        Nenhum comentário ainda. Seja o primeiro! 🎉
                    </p>
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
