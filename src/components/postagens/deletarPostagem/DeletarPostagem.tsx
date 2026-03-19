import { useContext, useEffect, useState, useCallback } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'
import Postagem from '../../../models/Postagem'
import { buscar, deletar } from '../../../services/Service'
import { ToastAlerta } from '../../../utils/ToastAlerts'

function DeletarPostagem() {

    // Criamos uma constante que recebe o hook useNavigate, para podermos redirecionar o usuário
    const navigate = useNavigate()

    // Variavel de Estado de Carregamento - usada para indicar que está havendo alguma requisição ao Back
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // Variavel de Estado de Postagem - Registra um Objeto da Model Postagem. Usada para armazena os dados que foram digitados nos inputs do formulario
    const [postagem, setPostagem] = useState<Postagem>({} as Postagem)  // Iniciamos um objeto vazio da Model Postagem

    // useParams = Esse hook serve para pegarmos parametros que veem na url do FRONT
    const { id } = useParams<{ id: string }>()  // Aqui, pegamos da URL um parametro/variavel chamado ID. Veja a rota de editarPostagem no APP.tsx 

    // Pega as informações que queremos do nosso Contexto através do hook useContexto
    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    // Função que vai chamada a service de Buscar para buscarmos uma Postagem em Especifico
    const buscarPorId = useCallback(async (id: string) => {
        try {
            await buscar(`/postagens/${id}`, setPostagem, { 
                headers: {
                    'Authorization': token
                }
            })
        } catch (error) {
            if (error?.toString().includes('403')) {
                ToastAlerta('O token expirou, favor logar novamente', '')
                handleLogout()
            }
        }
    }, [token, handleLogout]);

    // Função de Efeito Colateral - Sempre que a variavel token, tiver o seu valor alterado
    // uma função  é disparada, essa função verifica se o token é IDÊNTICO a "", se sim, isso indica que o usuário NÃO ESTÁ LOGADO.
    // Com isso, o avisamos e enviamos para a tela de Login
    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado', '')
            navigate('/login')
        }
    }, [token, navigate])

    // Função de Efeito Colateral - Sempre que o ID for montado pelo React dentro do Componente,
    //  uma função é disparada, iremos verificar se o ID é diferente de undefined, se sim, quer dizer que iremos atualizar uma Postagem, 
    // por isso, precisamos chamar a função que irá fazer uma requisição ao back para carregar os dados da Postagem em tela
    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)     
        }
    }, [id, buscarPorId])

    // Função assincrona que vai deletar a Postagem
    async function deletarPostagem() {
        setIsLoading(true)

        try {
            await deletar(`/postagens/${id}`, { // Aqui, na URL de Requisição, passamos o ID da Postagem a ser Excluído
                headers: {
                    'Authorization': token      // Passando um token pelo atributo Authorization
                }
            })

            ToastAlerta('Postagem apagada com sucesso', 'sucesso')

        } catch (error) {
            ToastAlerta('Erro ao apagar a Postagem', 'erro')
        }

        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/postagens")
    }


    return (
        <div className='container w-full px-4 lg:w-1/3 mx-auto transition-colors duration-300'>
            <h1 className='text-4xl text-center my-4 dark:text-slate-100'>Deletar postagem</h1>

            <p className='text-center font-semibold mb-4 dark:text-slate-300'>Você tem certeza de que deseja apagar a postagem a seguir?</p>

            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between dark:border-slate-700 transition-colors'>
                <header className='py-2 px-6 bg-indigo-600 text-white font-bold text-2xl dark:bg-slate-700 transition-colors'>Postagem</header>
                <div className="p-4 dark:bg-slate-800 transition-colors">
                    <p className='text-xl h-full dark:text-slate-100'>{postagem.titulo}</p>
                    <p className='dark:text-slate-300'>{postagem.texto}</p>
                </div>
                <div className="flex">
                    <button className='text-slate-100 bg-red-400 hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-500 w-full py-2 transition-colors' onClick={retornar}>Não</button>
                    <button className='w-full text-slate-100 bg-indigo-400 hover:bg-indigo-600 dark:bg-indigo-700 dark:hover:bg-indigo-500 flex items-center justify-center transition-colors' onClick={deletarPostagem}>

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

export default DeletarPostagem