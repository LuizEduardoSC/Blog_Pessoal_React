import { useContext, useEffect, useState, useCallback } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Tema from "../../../models/Tema";
import { buscar, deletar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerts";

function DeletarTema() {

    const navigate = useNavigate();

    const [tema, setTema] = useState<Tema>({} as Tema)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    const { id } = useParams<{ id: string }>();

    const buscarPorId = useCallback(async (id: string) => {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: { Authorization: token }
            })
        } catch (error) {
            if (error?.toString().includes('403')) {
                ToastAlerta('O token Expirou!', "erro")
                handleLogout()
            }
        }
    }, [token, handleLogout]);

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado!', "")
            navigate('/')
        }
    }, [token, navigate])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id, buscarPorId])

    function retornar() {
        navigate("/temas")
    }

    async function deletarTema() {

        setIsLoading(true)

        try {
            await deletar(`/temas/${id}`, {
                headers: { 'Authorization': token }
            })
            ToastAlerta('O Tema foi excluído com sucesso!', "sucesso")
        } catch (error) {
            if (error?.toString().includes('403')) {
                ToastAlerta('O Token Expirou!', "erro")
                handleLogout();
            } else {
                ToastAlerta('Erro ao excluir o tema.', "erro")
            }

        }

        setIsLoading(false)
        retornar()
    }

    return (
        <div className='container w-full px-4 lg:w-1/3 mx-auto transition-colors duration-300'>
            <h1 className='text-4xl text-center my-4 dark:text-slate-100'>Deletar tema</h1>
            <p className='text-center font-semibold mb-4 dark:text-slate-300'>
                Você tem certeza de que deseja apagar o tema a seguir?</p>
            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between dark:border-slate-700'>
                <header
                    className='py-2 px-6 bg-indigo-600 text-white font-bold text-2xl dark:bg-slate-700 transition-colors'>
                    Tema
                </header>
                <p className='p-8 text-3xl bg-slate-200 h-full dark:bg-slate-800 dark:text-slate-100 transition-colors'>{tema.descricao}</p>
                <div className="flex">
                    <button
                        className='text-slate-100 bg-red-400 hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-500 w-full py-2 transition-colors'
                        onClick={retornar}>
                        Não
                    </button>
                    <button
                        className='w-full text-slate-100 bg-indigo-400 
                                   hover:bg-indigo-600 dark:bg-indigo-700 dark:hover:bg-indigo-500 flex items-center justify-center transition-colors'
                        onClick={deletarTema}>
                        {isLoading ?
                            <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="24"
                                visible={true}
                            /> :
                            <span>Sim</span>

                        }
                    </button>
                </div>
            </div>
        </div>
    )
}
export default DeletarTema