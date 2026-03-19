import { useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Tema from "../../../models/Tema";
import { PageResponse, buscarPaginado } from "../../../services/Service";
import CardTemas from "../cardTemas/CardTemas";
import SkeletonCardTema from "../skeletonCardTema/SkeletonCardTema";
import { ToastAlerta } from "../../../utils/ToastAlerts";
import { MagnifyingGlass, CaretLeft, CaretRight } from "@phosphor-icons/react";


function ListaTemas() {

    const navigate = useNavigate();

    const [temas, setTemas] = useState<Tema[]>([])
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    // Estados de Paginação
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const { usuario } = useContext(AuthContext)
    const token = usuario.token

    const buscarTemas = useCallback(async (indice: number) => {
        setIsLoading(true);
        try {
            await buscarPaginado(`/temas?page=${indice}&size=6`, (data: PageResponse<Tema>) => {
                setTemas(data.content);
                setTotalPages(data.totalPages);
            }, {
                headers: { Authorization: token }
            });
        } catch (error) {
            console.error("Erro ao buscar temas:", error);
        }
        setIsLoading(false);
    }, [token]);

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado!', "")
            navigate('/')
        }
    }, [token, navigate])

    useEffect(() => {
        buscarTemas(page)
    }, [page, buscarTemas])

    const filteredTemas = temas.filter((tema) => 
        tema.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    );

    function handlePrevious() {
        if (page > 0) setPage(page - 1);
    }

    function handleNext() {
        if (page < totalPages - 1) setPage(page + 1);
    }

    return (
        <div className="min-h-screen transition-colors duration-300 pb-10">
            <div className="container mx-auto flex flex-col items-center justify-center py-8">
                <div className="w-full px-4 lg:w-1/2 relative group">
                    <input
                        type="text"
                        placeholder="Pesquisar nesta página..."
                        className="w-full pl-16 pr-6 py-3 rounded-full border-2 border-indigo-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-all shadow-md group-hover:shadow-lg"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <MagnifyingGlass 
                        size={22} 
                        className="absolute left-10 top-1/2 -translate-y-1/2 text-indigo-400 dark:text-slate-400 group-focus-within:text-indigo-600 transition-colors" 
                    />
                </div>
            </div>

            {isLoading && (
                <div className="flex justify-center w-full my-4 px-4">
                    <div className="container">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <SkeletonCardTema key={i} />
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {!isLoading && temas.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-2xl text-slate-500 dark:text-slate-400">Nenhum tema encontrado.</p>
                </div>
            )}

            <div className="flex justify-center w-full my-4 px-4">
                <div className="container flex flex-col">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredTemas.map((tema) => (
                            <CardTemas key={tema.id} tema={tema} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Controles de Paginação */}
            {totalPages > 1 && (
                <div className="container mx-auto flex justify-center items-center gap-4 mt-10">
                    <button
                        onClick={handlePrevious}
                        disabled={page === 0}
                        className="p-2 rounded-full bg-white dark:bg-slate-800 border dark:border-slate-700 text-indigo-600 dark:text-indigo-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm"
                    >
                        <CaretLeft size={24} weight="bold" />
                    </button>
                    
                    <span className="font-bold text-slate-700 dark:text-slate-300">
                        Página {page + 1} de {totalPages}
                    </span>

                    <button
                        onClick={handleNext}
                        disabled={page === totalPages - 1}
                        className="p-2 rounded-full bg-white dark:bg-slate-800 border dark:border-slate-700 text-indigo-600 dark:text-indigo-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm"
                    >
                        <CaretRight size={24} weight="bold" />
                    </button>
                </div>
            )}
        </div>
    )
}

export default ListaTemas;