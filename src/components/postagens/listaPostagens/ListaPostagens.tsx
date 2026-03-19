import { useContext, useEffect, useState, useCallback } from "react";
import { DNA } from "react-loader-spinner";
import { AuthContext } from "../../../contexts/AuthContext";
import Postagem from "../../../models/Postagem";
import { buscar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerts";
import CardPostagem from "../cardPostagem/CardPostagem";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlass } from "@phosphor-icons/react";

function ListaPostagens() {

    const navigate = useNavigate();

    const [postagens, setPostagens] = useState<Postagem[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    const buscarPostagens = useCallback(async () => {
        try {
            await buscar('/postagens', setPostagens, {
                headers: {
                    Authorization: token,
                },
            })

        } catch (error) {
            if (error?.toString().includes('403')) {
                ToastAlerta('O token expirou, favor logar novamente', "erro")
                handleLogout()
            }
        }
    }, [token, handleLogout]);

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado', "")
            navigate('/');
        }
    }, [token, navigate])

    useEffect(() => {
        buscarPostagens()
    }, [postagens.length, buscarPostagens])

    const filteredPostagens = postagens.filter((postagem) => 
        postagem.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        postagem.texto.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen transition-colors duration-300">
            <div className="container mx-auto flex flex-col items-center justify-center py-8">
                <div className="w-full px-4 lg:w-1/2 relative group">
                    <input
                        type="text"
                        placeholder="Pesquisar postagens..."
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

            {postagens.length === 0 && (
                <div className="flex justify-center items-center h-60">
                    <DNA
                        visible={true}
                        height="200"
                        width="200"
                        ariaLabel="dna-loading"
                        wrapperStyle={{}}
                        wrapperClass="dna-wrapper"
                    />
                </div>
            )}

            {postagens.length > 0 && filteredPostagens.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-2xl text-slate-500 dark:text-slate-400">Nenhuma postagem encontrada para "{searchTerm}"</p>
                </div>
            )}

            <div className='container mx-auto my-4 
                grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4'
            >
                {filteredPostagens.map((postagem) => (
                    <CardPostagem key={postagem.id} postagem={postagem} />
                ))}

            </div>
        </div>
    );
}

export default ListaPostagens;