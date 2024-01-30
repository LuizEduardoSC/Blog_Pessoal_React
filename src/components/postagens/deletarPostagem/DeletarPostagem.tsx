import { useContext, useEffect, useState } from 'react'
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
    async function buscarPorId(id: string) {
        try {
            await buscar(`/postagens/${id}`, setPostagem, { // Aqui, na URL de Requisição, passamos o ID da Postagem a ser Buscado
                headers: {
                    'Authorization': token                  // Passando um token pelo atributo Authorization
                }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {                 // Verifica se o erro é o 403 - Proibido que indica que o Token Expirou
                ToastAlerta('O token expirou, favor logar novamente', '')     // Avisa ao usuário que deu ruim
                handleLogout()                                      // Chama a função para deslogar o usuário
            }
        }
    }

    // Função de Efeito Colateral - Sempre que a variavel token, tiver o seu valor alterado
    // uma função  é disparada, essa função verifica se o token é IDÊNTICO a "", se sim, isso indica que o usuário NÃO ESTÁ LOGADO.
    // Com isso, o avisamos e enviamos para a tela de Login
    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado', '')
            navigate('/login')
        }
    }, [token])

    // Função de Efeito Colateral - Sempre que o ID for montado pelo React dentro do Componente,
    //  uma função é disparada, iremos verificar se o ID é diferente de undefined, se sim, quer dizer que iremos atualizar uma Postagem, 
    // por isso, precisamos chamar a função que irá fazer uma requisição ao back para carregar os dados da Postagem em tela
    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)     // esse ID, é o que vem pela a URL da rota do Front End
        }
    }, [id])

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
        <div className='container w-1/3 mx-auto'>
            <h1 className='text-4xl text-center my-4'>Deletar postagem</h1>

            <p className='text-center font-semibold mb-4'>Você tem certeza de que deseja apagar a postagem a seguir?</p>

            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header className='py-2 px-6 bg-indigo-600 text-white font-bold text-2xl'>Postagem</header>
                <div className="p-4">
                    <p className='text-xl h-full'>{postagem.titulo}</p>
                    <p>{postagem.texto}</p>
                </div>
                <div className="flex">
                    <button className='text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2' onClick={retornar}>Não</button>
                    <button className='w-full text-slate-100 bg-indigo-400 hover:bg-indigo-600 flex items-center justify-center' onClick={deletarPostagem}>

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