import { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import Postagem from '../../../models/Postagem';
import Tema from '../../../models/Tema';
import { buscar, atualizar, cadastrar } from '../../../services/Service';
import { RotatingLines } from 'react-loader-spinner';
import { ToastAlerta } from '../../../utils/ToastAlerts';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function FormPostagem() {
  
    const navigate = useNavigate();

    // Variavel de Estado de Carregamento - usada para indicar que está havendo alguma requisição ao Back
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { id } = useParams<{ id: string }>();

    const { usuario } = useContext(AuthContext);
    const token = usuario.token;

    const [temas, setTemas] = useState<Tema[]>([]);

    const [tema, setTema] = useState<Tema>({
        id: 0,
        descricao: '',
    });

    const carregandoTema = tema.descricao === '';

    const [postagem, setPostagem] = useState<Postagem>({
        id: 0,
        titulo: '',
        texto: '',
        data: '',
        tema: null,
        usuario: null,
    });

    const buscarPostagemPorId = useCallback(async (id: string) => {
        try {
            await buscar(`/postagens/${id}`, setPostagem, {
                headers: {
                    Authorization: token,
                },
            });
        } catch (error) {
            console.error("Erro ao buscar postagem por ID:", error);
        }
    }, [token]);

    const buscarTemaPorId = useCallback(async (id: string) => {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: {
                    Authorization: token,
                },
            });
        } catch (error) {
            console.error("Erro ao buscar tema por ID:", error);
        }
    }, [token]);

    const buscarTemas = useCallback(async () => {
        try {
            await buscar('/temas', setTemas, {
                headers: {
                    Authorization: token,
                },
            });
        } catch (error) {
            console.error("Erro ao buscar temas:", error);
        }
    }, [token]);

    useEffect(() => {
        if (token === "") {
            ToastAlerta('Você precisa estar logado', "info")
            navigate('/login');
        }
    }, [token, navigate]);

    useEffect(() => {
        buscarTemas();
        if (id !== undefined) {
            buscarPostagemPorId(id);
        }
    }, [id, buscarPostagemPorId, buscarTemas]);

    useEffect(() => {
        setPostagem({
            ...postagem,
            tema: tema,
        });
    }, [tema, postagem]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            tema: tema,
            usuario: usuario,
        });
    }

    function handleTextoChange(value: string) {
        setPostagem({
            ...postagem,
            texto: value,
            tema: tema,
            usuario: usuario,
        });
    }

    function retornar() {
        navigate('/postagens');
    }

    async function gerarNovaPostagem(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        const postagemParaEnviar = { ...postagem, tema: tema, usuario: usuario };

        if (id != undefined) {
            try {
                await atualizar(`/postagens`, postagemParaEnviar, setPostagem, {
                    headers: { 'Authorization': token }
                })
                ToastAlerta('Postagem atualizada com sucesso', "sucesso")

            } catch (error) {
                const message = (error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Erro ao atualizar a Postagem';
                ToastAlerta(message, "erro");
            }

        } else {
            try {
                await cadastrar(`/postagens`, postagemParaEnviar, setPostagem, {
                    headers: { 'Authorization': token }
                })

                ToastAlerta('Postagem cadastrada com sucesso', "sucesso")

            } catch (error) {
                const message = (error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Erro ao cadastrar a Postagem';
                ToastAlerta(message, "erro");
            }
        }

        setIsLoading(false) // Muda o estado para falso, indicando a requisição já terminou de ser processada
        retornar()
    }

    return (
        <div className="container flex flex-col mx-auto items-center transition-colors duration-300">
            <h1 className="text-4xl text-center my-8 dark:text-slate-100">
                {id !== undefined ? 'Editar Postagem' : 'Cadastrar Postagem'}
            </h1>

            <form className="flex flex-col w-full px-4 lg:w-1/2 gap-4" onSubmit={gerarNovaPostagem}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo" className="dark:text-slate-100">Título da Postagem</label>
                    <input
                        type="text"
                        placeholder="Titulo"
                        name="titulo"
                        required
                        className="border-2 border-slate-700 rounded p-2 bg-white dark:bg-slate-800 dark:text-slate-100 transition-colors"
                        value={postagem.titulo}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="texto" className="dark:text-slate-100 font-bold">Conteúdo da Postagem</label>
                    <div className="bg-white rounded overflow-hidden">
                        <ReactQuill
                            theme="snow"
                            value={postagem.texto}
                            onChange={handleTextoChange}
                            placeholder="Escreva algo incrível..."
                            className="bg-white text-slate-900"
                            modules={{
                                toolbar: [
                                    [{ 'header': [1, 2, 3, false] }],
                                    ['bold', 'italic', 'underline', 'strike'],
                                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                    ['link', 'clean']
                                ],
                            }}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="dark:text-slate-100">Tema da Postagem</p>
                    <select name="tema" id="tema"
                        className='border-2 border-slate-700 rounded p-2 bg-white dark:bg-slate-800 dark:text-slate-100 transition-colors'
                        onChange={(e) => buscarTemaPorId(e.currentTarget.value)}
                        value={tema.id !== 0 ? tema.id : ''}
                    >
                        <option value="" disabled className="dark:text-slate-400">Selecione um Tema</option>
                        {temas.map((tema) => (
                            <option key={tema.id} value={tema.id} className="dark:text-slate-100">{tema.descricao}</option>
                        ))}
                    </select>
                </div>
                <button
                    type='submit'
                    disabled={carregandoTema}
                    className='rounded disabled:bg-slate-200 bg-indigo-400 dark:bg-indigo-600 dark:hover:bg-indigo-500
                            hover:bg-indigo-800 text-white font-bold w-1/2 
                            mx-auto py-2 flex justify-center transition-colors'
                >
                    {isLoading ?
                        <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        /> :
                        <span>{id !== undefined ? 'Atualizar' : 'Cadastrar'}</span>
                    }
                </button>
            </form>
        </div>
    );
}

export default FormPostagem;