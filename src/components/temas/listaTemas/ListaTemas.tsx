import { useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Tema from "../../../models/Tema";
import { buscar } from "../../../services/Service";
import CardTemas from "../cardTemas/CardTemas";
import SkeletonCardTema from "../skeletonCardTema/SkeletonCardTema";
import { ToastAlerta } from "../../../utils/ToastAlerts";
import { MagnifyingGlass } from "@phosphor-icons/react";


function ListaTemas() {

    const navigate = useNavigate();

    const [temas, setTemas] = useState<Tema[]>([])
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    const buscarTemas = useCallback(async () => {
        setIsLoading(true);
        try {
            await buscar('/temas', setTemas, {
                headers: { Authorization: token }
            });
        } catch (error) {
            if (error?.toString().includes('403')) {
                ToastAlerta('O token Expirou!', "erro");
                handleLogout();
            }
        }
        setIsLoading(false);
    }, [token, handleLogout]);

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado!', "")
            navigate('/')
        }
    }, [token, navigate])

    useEffect(() => {
        buscarTemas()
    }, [temas.length, buscarTemas])

    const filteredTemas = temas.filter((tema) => 
        tema.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen transition-colors duration-300">
            <div className="container mx-auto flex flex-col items-center justify-center py-8">
                <div className="w-full px-4 lg:w-1/2 relative group">
                    <input
                        type="text"
                        placeholder="Pesquisar temas..."
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

            {temas.length > 0 && filteredTemas.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-2xl text-slate-500 dark:text-slate-400">Nenhum tema encontrado para "{searchTerm}"</p>
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
        </div>
    )
}

export default ListaTemas;