import { useState, useContext, useEffect, ChangeEvent, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Tema from "../../../models/Tema";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerts";

function FormTema() {

    const navigate = useNavigate();

    const [tema, setTema] = useState<Tema>({} as Tema)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { usuario } = useContext(AuthContext)
    const token = usuario.token

    const { id } = useParams<{ id: string }>();

    const buscarPorId = useCallback(async (id: string) => {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: { Authorization: token }
            })
        } catch (error) {
            console.error("Erro ao buscar tema por ID:", error);
        }
    }, [token]);

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

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setTema({
            ...tema,
            [e.target.name]: e.target.value
        })
    }

    function retornar() {
        navigate("/temas")
    }

    async function gerarNovoTema(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined) {
            try {
                await atualizar(`/temas`, tema, setTema, {
                    headers: { 'Authorization': token }
                })
                ToastAlerta('O Tema foi atualizado com sucesso!', "sucesso")
            } catch (error) {
                console.error("Erro ao atualizar tema:", error);
                ToastAlerta('Erro ao atualizar o tema.', "erro")
            }
        } else {
            try {
                await cadastrar(`/temas`, tema, setTema, {
                    headers: { 'Authorization': token }
                })
                ToastAlerta('O Tema foi cadastrado com sucesso!', "sucesso")
            } catch (error) {
                console.error("Erro ao cadastrar tema:", error);
                ToastAlerta('Erro ao cadastrar o tema.', "erro")
            }
        }

        setIsLoading(false)
        retornar()
    }

    return (
        <div className="container flex flex-col items-center justify-center mx-auto transition-colors duration-300">
            <h1 className="text-4xl text-center my-8 dark:text-slate-100">
                {id === undefined ? 'Cadastrar Tema' : 'Editar Tema'}
            </h1>

            <form className="w-full px-4 lg:w-1/2 flex flex-col gap-4" onSubmit={gerarNovoTema}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="descricao" className="dark:text-slate-100">Descrição do Tema</label>
                    <input
                        type="text"
                        placeholder="Descreva aqui seu tema"
                        name='descricao'
                        className="border-2 border-slate-700 rounded p-2 bg-white dark:bg-slate-800 dark:text-slate-100 transition-colors"
                        value={tema.descricao}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <button
                    className="rounded text-slate-100 bg-indigo-400 
                               hover:bg-indigo-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 w-full lg:w-1/2 py-2 mx-auto flex justify-center transition-colors shadow-lg active:scale-95"
                    type="submit">

                    {isLoading ?
                        <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        /> :
                        <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>
                        
                    }
                    
                </button>
            </form>
        </div>
    );
}

export default FormTema;