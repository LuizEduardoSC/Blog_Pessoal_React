import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Moon, Sun } from "@phosphor-icons/react";
import { AuthContext } from "../../contexts/AuthContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { ToastAlerta } from "../../utils/ToastAlerts";

function Navbar() {

    const navigate = useNavigate();

    const { usuario, handleLogout } = useContext(AuthContext)
    const themeContext = useContext(ThemeContext)

    if (!themeContext) return null;
    const { theme, toggleTheme } = themeContext;

    function logout() {
        handleLogout()
        ToastAlerta('O Usuário foi desconectado com sucesso!', "sucesso")
        navigate('/login')
    }

    if(usuario.token === "") {
        return <></>
    }

    return (
        <div className='w-full bg-indigo-900 text-white dark:bg-slate-900 dark:text-slate-100
                flex justify-center py-4 transition-colors duration-300 shadow-md'>
            <div className="container flex justify-between text-lg">
                <Link to='/home' className="text-2xl font-bold">Blog Pessoal</Link>

                <div className='flex gap-4 items-center'>
                    <Link to='/home' className='hover:underline'>Home</Link>
                    <Link to='/postagens' className='hover:underline'>Postagens</Link>
                    <Link to='/temas' className='hover:underline'>Temas</Link>
                    <Link to='/cadastrartema' className='hover:underline'>Cadastrar tema</Link>
                    <Link to='/perfil' className='hover:underline'>Perfil</Link>
                    <Link to='' onClick={logout} className='hover:underline'>Sair</Link>
                    
                    <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-white/10 transition-colors" title="Alternar tema">
                        {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
                    </button>
                </div>
            </div>
        </div>
    )
}



export default Navbar