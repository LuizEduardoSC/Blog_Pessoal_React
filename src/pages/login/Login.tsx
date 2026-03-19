import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import UsuarioLogin from '../../models/UsuarioLogin';
import './Login.css';

import { Moon, Sun } from '@phosphor-icons/react';
import { ThemeContext } from '../../contexts/ThemeContext';

function Login() {

    const navigate = useNavigate();

    const { usuario, handleLogin, isLoading } = useContext(AuthContext)
    const themeContext = useContext(ThemeContext)

    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({
        usuario: '',
        senha: ''
    } as UsuarioLogin)

    useEffect(() => {
        if (usuario.token !== "") {
            navigate('/home')
        }
    }, [usuario, navigate])

    if (!themeContext) return null;
    const { theme, toggleTheme } = themeContext;

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value
        })
    }

    function login(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        handleLogin(usuarioLogin)
    }

    return (
        <>
            <div className={`grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold transition-colors duration-300 relative ${theme === 'dark' ? 'bg-slate-900' : 'bg-indigo-900'}`}>
                <button 
                    onClick={toggleTheme} 
                    className="absolute bottom-10 right-10 lg:right-[52%] z-50 p-4 rounded-full bg-indigo-900 text-white dark:bg-indigo-600 shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center"
                    title="Alternar tema"
                >
                    {theme === 'light' ? <Moon size={28} weight="fill" /> : <Sun size={28} weight="fill" />}
                </button>

                <form className="flex justify-center items-center flex-col w-1/2 gap-4 transition-colors duration-300"
                    onSubmit={login}>
                    <h2 className={`text-5xl ${theme === 'dark' ? 'text-slate-100' : 'text-white'}`}>Entrar</h2>
                    <div className="flex flex-col w-full">
                        <label htmlFor="usuario" className={theme === 'dark' ? 'text-slate-100' : 'text-white'}>Usuário</label>
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            placeholder="Usuario"
                            className={`border-2 border-slate-700 rounded p-2 transition-colors ${theme === 'dark' ? 'bg-slate-800 text-slate-100' : 'bg-white text-slate-900'}`}
                            value={usuarioLogin.usuario}
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
                            value={usuarioLogin.senha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <button type='submit' className="rounded bg-indigo-400 hover:bg-indigo-900 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white w-1/2 py-2 flex justify-center transition-colors">
                        {isLoading ? <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        /> :
                            <span>Entrar</span>
                        }
                    </button>

                    <hr className={`w-full ${theme === 'dark' ? 'border-slate-500' : 'border-white'}`} />

                    <p className={theme === 'dark' ? 'text-slate-100 text-center' : 'text-white text-center'}>
                        Ainda não tem uma conta?{' '}
                        <Link to="/cadastro" className={`${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-200'} hover:underline font-bold`}>
                            Cadastre-se
                        </Link>
                    </p>
                </form>
                <div className="fundoLogin hidden lg:block"></div>
            </div >
        </>
    );
}


export default Login;