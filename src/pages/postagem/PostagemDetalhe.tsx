import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart } from '@phosphor-icons/react';
import { RotatingLines } from 'react-loader-spinner';
import { AuthContext } from '../../contexts/AuthContext';
import Postagem from '../../models/Postagem';
import { buscar, atualizar } from '../../services/Service';
import { ToastAlerta } from '../../utils/ToastAlerts';
import ListaComentarios from '../../components/comentarios/listaComentarios/ListaComentarios';

function PostagemDetalhe() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const { usuario } = useContext(AuthContext);
    const token = usuario.token;

    const [postagem, setPostagem] = useState<Postagem>({} as Postagem);
    const [isLoading, setIsLoading] = useState(true);
    const [isLiked, setIsLiked] = useState(false);

    async function curtirPostagem() {
        const novoLike = (postagem.curtir || 0) + 1;
        setPostagem({ ...postagem, curtir: novoLike });
        setIsLiked(true);

        try {
            await atualizar(`/postagens`, { ...postagem, curtir: novoLike }, () => {}, {
                headers: { Authorization: token },
            });
        } catch (error) {
            console.error("Erro ao curtir postagem:", error);
            setIsLiked(false);
        }
    }

    const buscarPostagem = useCallback(async (postagemId: string) => {
        setIsLoading(true);
        try {
            await buscar(`/postagens/${postagemId}`, setPostagem, {
                headers: { Authorization: token },
            });
        } catch (error) {
            console.error("Erro ao buscar postagem:", error);
            navigate('/postagens');
        }
        setIsLoading(false);
    }, [token, navigate]);

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado!', '');
            navigate('/');
        }
    }, [token, navigate]);

    useEffect(() => {
        if (id !== undefined) {
            buscarPostagem(id);
        }
    }, [id, buscarPostagem]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <RotatingLines strokeColor="#6366f1" strokeWidth="5" animationDuration="0.75" width="60" visible />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl transition-colors duration-300">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 mb-6 font-bold transition-colors"
            >
                <ArrowLeft size={20} />
                Voltar
            </button>

            <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border dark:border-slate-700 transition-colors"
            >
                {/* Header do autor */}
                <div className="flex items-center gap-4 p-6 bg-indigo-500 dark:bg-slate-700 transition-colors">
                    <img
                        src={postagem.usuario?.foto || 'https://i.imgur.com/HeIi0wU.png'}
                        alt={postagem.usuario?.nome}
                        className="h-14 w-14 rounded-full object-cover border-2 border-white"
                    />
                    <div>
                        <h2 className="font-bold text-white text-lg">{postagem.usuario?.nome}</h2>
                        <p className="text-indigo-100 dark:text-slate-300 text-sm">
                            {postagem.data && new Intl.DateTimeFormat('pt-BR', {
                                dateStyle: 'full',
                                timeStyle: 'short',
                            }).format(new Date(postagem.data))}
                        </p>
                    </div>
                </div>

                {/* Conteúdo da postagem */}
                <div className="p-6 md:p-8">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs font-bold rounded-full uppercase tracking-wider">
                            {postagem.tema?.descricao}
                        </span>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-3xl font-bold uppercase dark:text-slate-100 leading-snug">
                            {postagem.titulo}
                        </h1>
                        <button 
                            onClick={curtirPostagem}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 font-bold transition-all hover:scale-105 active:scale-95 shadow-sm"
                        >
                            <motion.div
                                animate={isLiked ? { scale: [1, 1.4, 1] } : {}}
                                transition={{ duration: 0.3 }}
                            >
                                <Heart size={24} weight={isLiked ? "fill" : "bold"} />
                            </motion.div>
                            {postagem.curtir || 0}
                        </button>
                    </div>

                    <div 
                        className="text-slate-700 dark:text-slate-300 leading-relaxed text-base quill-content"
                        dangerouslySetInnerHTML={{ __html: postagem.texto }} 
                    />
                </div>

                {/* Ações */}
                <div className="flex border-t dark:border-slate-700">
                    <Link
                        to={`/editarpostagem/${postagem.id}`}
                        className="w-full text-white bg-indigo-500 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 flex items-center justify-center py-3 transition-colors font-bold"
                    >
                        Editar Post
                    </Link>
                    <Link
                        to={`/deletarpostagem/${postagem.id}`}
                        className="w-full text-white bg-red-500 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 flex items-center justify-center py-3 transition-colors font-bold"
                    >
                        Deletar Post
                    </Link>
                </div>
            </motion.article>

            {/* Seção de comentários */}
            {postagem.id && <ListaComentarios postagem={postagem} />}
        </div>
    );
}

export default PostagemDetalhe;
