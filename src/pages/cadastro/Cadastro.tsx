import { ChangeEvent, FormEvent, useCallback, useContext, useEffect, useState } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import Usuario from '../../models/Usuario'
import { cadastrarUsuario } from '../../services/Service'
import './Cadastro.css'

import { ToastAlerta } from '../../utils/ToastAlerts'

import { Moon, Sun } from '@phosphor-icons/react';
import { ThemeContext } from '../../contexts/ThemeContext';

function Cadastro() {

    const navigate = useNavigate();

    const themeContext = useContext(ThemeContext)

    // Variavel de Estado de Carregamento - usada para indicar que está havendo alguma requisição ao Back
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // Variavel de Estado de Senha - usada para verificar se as senhas foram digitadas iguais
    const [confirmaSenha, setConfirmaSenha] = useState<string>("")

    // Variavel de Estado do Usuário - Registra um Objeto da Interface Usuario que armazena os dados que foram digitados nos inputs do formulario
    const [usuario, setUsuario] = useState<Usuario>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: ''
    })

    const [usuarioResult, setUsuarioResult] = useState<Usuario>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: ''
    })

    // Função que envia o usuario a pagina de login, através das rotas
    const retornar = useCallback(() => {
        navigate('/login')
    }, [navigate])

    useEffect(() => {
        if (usuarioResult.id !== 0) {
            retornar()
        }
    }, [usuarioResult, retornar])

    if (!themeContext) return null;
    const { theme, toggleTheme } = themeContext;

    // Função que através do evento de mudança de um Input, captura o que foi digitado e através da função setUsuario() atualiza o estado/objeto de usuario
    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuario({    // atualiza o estado Usuario com os dados digitados no input

            ...usuario,    //  o spread operator (...) espalha os atributos do objeto para facilitar a atualização


            /*  com o spread operator, o react entende o objeto assim:
                id: 0,
                nome: '',
                usuario: '',
                senha: '',
                foto: ''
            */

            // O lado esquerdo, representa qual input chamou essa função e qual atributo do Objeto Usuario que será acessado, a parte direita pega o valor digitado
            [e.target.name]: e.target.value
        })
    }

    // Função que através do evento de mudança de um Input, captura o que foi digitado e através da função setConfirmaSenha() atualiza o estado de senha
    function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
        setConfirmaSenha(e.target.value)

    }

    // Função assincrona que vai cadastrar o usuário
    async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
        e.preventDefault() // através do parametro E que representa um os eventos do Formulario, impedimos que o Form recarregue a página ao tentar enviar os dados

        // Verificamos se as senhas digitadas são iguais e se tem mais que 8 caracteres
        if (confirmaSenha === usuario.senha && usuario.senha.length >= 8) {

            setIsLoading(true)// Muda o estado para verdadeiro, indicando que existe uma requisição sendo processada no back

            try {    // Tenta fazer a requisição, e se houver erro impede que a aplicação pare
                await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuarioResult)    // Esperamos que a Service cadastrarUsuario() finalize a sua requisição

                ToastAlerta('Usuario cadastrado com sucesso!', "sucesso")    // Avisa ao usuário que deu bom
            } catch (error: any) {
                console.error("Erro no cadastro:", error)
                
                // Tenta extrair a mensagem do backend (nosso HttpResponse.java)
                const backendMessage = error.response?.data?.message;
                
                // Se não encontrar, tenta a mensagem genérica do Axios ou o fallback
                const message = backendMessage || error.message || 'Erro ao cadastrar o usuario!';
                
                ToastAlerta(message, "erro")    // Avisa ao usuário que deu erro
            }
        } else {
            ToastAlerta('Dados estão inconsistentes. Verifique as informações do cadastro', "erro")  // Se as senhas forem < do que 8 ou forem difernetes

            setUsuario({ ...usuario, senha: '' })  // Reinicia o campo de Senha
            setConfirmaSenha('')                   // Reinicia o campo de Confirmar Senha
        }

        setIsLoading(false)   // Muda o estado para falso, indicando a requisição já terminou de ser processada
    }

    return (
        <>
            <div className={`grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold transition-colors duration-300 relative ${theme === 'dark' ? 'bg-slate-900' : 'bg-indigo-900'}`}>
                <button 
                    onClick={toggleTheme} 
                    className="absolute bottom-10 right-10 lg:right-auto lg:left-[52%] z-50 w-14 h-14 rounded-full bg-white text-indigo-900 dark:bg-indigo-600 dark:text-white shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center border-2 border-indigo-900 dark:border-slate-800"
                    title="Alternar tema"
                >
                    {theme === 'light' ? <Moon size={28} weight="fill" /> : <Sun size={28} weight="fill" />}
                </button>

                <div className="fundoCadastro hidden lg:block"></div>
                <form className='flex justify-center items-center flex-col w-full px-10 lg:w-2/3 gap-3 transition-colors duration-300'
                    onSubmit={cadastrarNovoUsuario}  
                    >    

                    <h2 className={`text-5xl ${theme === 'dark' ? 'text-slate-100' : 'text-white'}`}>Cadastrar</h2>
                    <div className="flex flex-col w-full">
                        <label htmlFor="nome" className={theme === 'dark' ? 'text-slate-100' : 'text-white'}>Nome</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            placeholder="Nome"
                            className={`border-2 border-slate-700 rounded p-2 transition-colors ${theme === 'dark' ? 'bg-slate-800 text-slate-100' : 'bg-white text-slate-900'}`}
                            value={usuario.nome}   // Conecta esse input com o atributo nome do estado/objeto usuario
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}  // Quando o usuario digitar algo, chama a função atualizarEstado
                            
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="usuario" className={theme === 'dark' ? 'text-slate-100' : 'text-white'}>Usuario</label>
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            placeholder="Usuario"
                            className={`border-2 border-slate-700 rounded p-2 transition-colors ${theme === 'dark' ? 'bg-slate-800 text-slate-100' : 'bg-white text-slate-900'}`}
                            value={usuario.usuario}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="foto" className={theme === 'dark' ? 'text-slate-100' : 'text-white'}>Foto</label>
                        <input
                            type="text"
                            id="foto"
                            name="foto"
                            placeholder="Foto"
                            className={`border-2 border-slate-700 rounded p-2 transition-colors ${theme === 'dark' ? 'bg-slate-800 text-slate-100' : 'bg-white text-slate-900'}`}
                            value={usuario.foto}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="senha" className={theme === 'dark' ? 'text-slate-100' : 'text-white'}>Senha</label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="Senha"
                            className={`border-2 border-slate-700 rounded p-2 transition-colors ${theme === 'dark' ? 'bg-slate-800 text-slate-100' : 'bg-white text-slate-900'}`}
                            value={usuario.senha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="confirmarSenha" className={theme === 'dark' ? 'text-slate-100' : 'text-white'}>Confirmar Senha</label>
                        <input
                            type="password"
                            id="confirmarSenha"
                            name="confirmarSenha"
                            placeholder="Confirmar Senha"
                            className={`border-2 border-slate-700 rounded p-2 transition-colors ${theme === 'dark' ? 'bg-slate-800 text-slate-100' : 'bg-white text-slate-900'}`}
                            value={confirmaSenha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
                        />
                    </div>
                    <div className="flex justify-around w-full gap-8">
                        <button className={`rounded text-white bg-red-400 hover:bg-red-700 w-1/2 py-2 transition-all ${theme === 'dark' ? 'dark:bg-red-700 dark:hover:bg-red-500' : ''}`} onClick={retornar}>
                            Cancelar
                        </button>
                        <button type='submit' className="rounded text-white bg-indigo-400 hover:bg-indigo-900 dark:bg-indigo-600 dark:hover:bg-indigo-500 w-1/2 py-2 flex justify-center transition-all">

                            {
                            // Renderização Condicial - Se isLoading for true mostra o componente de carregamento
                            isLoading ? <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="24"
                                visible={true}
                            /> :    // Se não, mostra apenas o Cadastrar
                                <span>Cadastrar</span>
                            }

                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}


export default Cadastro