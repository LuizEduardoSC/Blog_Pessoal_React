import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { List, Moon, Sun, UserCircle, X } from "@phosphor-icons/react";
import { AuthContext } from "../../contexts/AuthContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { ToastAlerta } from "../../utils/ToastAlerts";

function Navbar() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { usuario, handleLogout, isOnline, setIsOnline } = useContext(AuthContext);
    const themeContext = useContext(ThemeContext);

    if (!themeContext) return null;
    const { theme, toggleTheme } = themeContext;

    function logout() {
        handleLogout();
        ToastAlerta("O Usuário foi desconectado com sucesso!", "sucesso");
        setIsMenuOpen(false);
        navigate("/login");
    }

    if (usuario.token === "") {
        return <></>;
    }

    return (
        <nav className="w-full bg-indigo-900 text-white dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300 shadow-xl sticky top-0 z-[100]">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center text-lg">
                    <Link to="/home" className="text-2xl font-bold hover:scale-105 transition-transform">
                        Blog Pessoal
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex gap-6 items-center font-medium">
                        <Link to="/home" className="hover:text-indigo-200 transition-colors">Home</Link>
                        <Link to="/postagens" className="hover:text-indigo-200 transition-colors">Postagens</Link>
                        <Link to="/temas" className="hover:text-indigo-200 transition-colors">Temas</Link>
                        <Link to="/cadastrartema" className="hover:text-indigo-200 transition-colors">Novo Tema</Link>
                        <Link to="/perfil" className="hover:text-indigo-200 transition-colors flex items-center gap-2">
                            <div className="relative cursor-pointer group" title={isOnline ? "Ficar Offline" : "Ficar Online"} onClick={() => {
                                setIsOnline(!isOnline);
                                ToastAlerta(`Você agora está ${!isOnline ? "Online" : "Offline"}`, "info");
                            }}>
                                {usuario.foto ? (
                                    <img src={usuario.foto} alt={usuario.nome} className="w-8 h-8 rounded-full object-cover border border-white/50 group-hover:opacity-80 transition-opacity" />
                                ) : (
                                    <UserCircle size={24} />
                                )}
                                <span className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-indigo-900 border border-white transition-colors duration-300 ${isOnline ? "bg-green-500" : "bg-slate-400"}`}></span>
                            </div>
                            Perfil
                        </Link>
                        <Link to="" onClick={logout} className="hover:text-red-300 transition-colors font-bold">Sair</Link>
                        
                        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-white/10 transition-colors border border-transparent hover:border-white/20" title="Alternar tema">
                            {theme === "light" ? <Moon size={24} weight="fill" /> : <Sun size={24} weight="fill" />}
                        </button>
                    </div>

                    {/* Mobile Controls */}
                    <div className="flex lg:hidden items-center gap-4">
                        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                            {theme === "light" ? <Moon size={24} weight="fill" /> : <Sun size={24} weight="fill" />}
                        </button>
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                        >
                            {isMenuOpen ? <X size={32} /> : <List size={32} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? "max-h-[500px] opacity-100 py-6" : "max-h-0 opacity-0"}`}>
                    <div className="flex flex-col gap-4 text-center text-xl font-semibold">
                        <Link to="/home" onClick={() => setIsMenuOpen(false)} className="hover:bg-white/10 py-2 rounded-lg transition-colors">Home</Link>
                        <Link to="/postagens" onClick={() => setIsMenuOpen(false)} className="hover:bg-white/10 py-2 rounded-lg transition-colors">Postagens</Link>
                        <Link to="/temas" onClick={() => setIsMenuOpen(false)} className="hover:bg-white/10 py-2 rounded-lg transition-colors">Temas</Link>
                        <Link to="/cadastrartema" onClick={() => setIsMenuOpen(false)} className="hover:bg-white/10 py-2 rounded-lg transition-colors">Novo Tema</Link>
                        <div onClick={() => setIsMenuOpen(false)}>
                        <Link to="/perfil" className="hover:bg-white/10 py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                            <div className="relative cursor-pointer" onClick={(e) => {
                                e.stopPropagation();
                                setIsOnline(!isOnline);
                                ToastAlerta(`Você agora está ${!isOnline ? "Online" : "Offline"}`, "info");
                            }}>
                                {usuario.foto ? (
                                    <img src={usuario.foto} alt={usuario.nome} className="w-8 h-8 rounded-full object-cover border border-white/50" />
                                ) : (
                                    <UserCircle size={24} />
                                )}
                                <span className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-indigo-900 border border-white transition-colors duration-300 ${isOnline ? "bg-green-500" : "bg-slate-400"}`}></span>
                            </div>
                            Perfil
                        </Link>
                        </div>
                        <Link to="" onClick={logout} className="text-red-400 py-2 rounded-lg hover:bg-red-500/10 transition-colors">Sair</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;