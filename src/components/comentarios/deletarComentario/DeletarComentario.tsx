import { useCallback, useContext, useEffect, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import Comentario from '../../../models/Comentario';
import { buscar, deletar } from '../../../services/Service';
import { ToastAlerta } from '../../../utils/ToastAlerts';

function DeletarComentario() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const { usuario } = useContext(AuthContext);
    const token = usuario.token;

    const [isLoading, setIsLoading] = useState(false);
    const [comentario, setComentario] = useState<Comentario>({} as Comentario);

    const buscarPorId = useCallback(async (comentarioId: string) => {
        try {
            await buscar(`/comentarios/${comentarioId}`, setComentario, {
                headers: { Authorization: token },
            });
        } catch (error) {
            console.error("Erro ao buscar comentário por ID:", error);
        }
    }, [token]);

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado!', '');
            navigate('/');
        }
    }, [token, navigate]);

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id);
        }
    }, [id, buscarPorId]);

    function retornar() {
        navigate(-1);
    }

    async function deletarComentario() {
        setIsLoading(true);
        try {
            await deletar(`/comentarios/${id}`, {
                headers: { Authorization: token },
            });
            ToastAlerta('Comentário excluído com sucesso!', 'sucesso');
        } catch (error) {
            console.error("Erro ao excluir comentário:", error);
            ToastAlerta('Erro ao excluir o comentário.', 'erro');
        }
        setIsLoading(false);
        retornar();
    }

    return (
        <div className="container w-full px-4 lg:w-1/2 mx-auto transition-colors duration-300">
            <h1 className="text-4xl text-center my-6 dark:text-slate-100 font-bold">Excluir Comentário</h1>
            <p className="text-center font-semibold mb-4 dark:text-slate-300">
                Tem certeza que deseja apagar o comentário abaixo?
            </p>
            <div className="border flex flex-col rounded-2xl overflow-hidden justify-between dark:border-slate-700 shadow-lg">
                <header className="py-3 px-6 bg-indigo-600 text-white font-bold text-lg dark:bg-slate-700 transition-colors">
                    Comentário de {comentario.usuario?.nome}
                </header>
                <p className="p-6 text-lg bg-slate-100 h-full dark:bg-slate-800 dark:text-slate-100 transition-colors italic">
                    "{comentario.texto}"
                </p>
                <div className="flex">
                    <button
                        className="text-white bg-red-400 hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-500 w-full py-3 transition-colors font-bold"
                        onClick={retornar}
                    >
                        Não
                    </button>
                    <button
                        className="w-full text-white bg-indigo-500 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 flex items-center justify-center py-3 transition-colors font-bold"
                        onClick={deletarComentario}
                    >
                        {isLoading ? (
                            <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="24" visible />
                        ) : (
                            <span>Sim, excluir</span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeletarComentario;
