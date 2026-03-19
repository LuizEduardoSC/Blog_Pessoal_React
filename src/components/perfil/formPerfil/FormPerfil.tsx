import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Usuario from "../../../models/Usuario";
import UsuarioLogin from "../../../models/UsuarioLogin";
import { atualizar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerts";
import { RotatingLines } from "react-loader-spinner";

function FormPerfil() {
    const navigate = useNavigate();
    const { usuario, setUsuario } = useContext(AuthContext);
    const token = usuario.token;

    const [isLoading, setIsLoading] = useState(false);
    const [perfil, setPerfil] = useState<Usuario>({
        id: usuario.id,
        nome: usuario.nome,
        usuario: usuario.usuario,
        senha: '',
        foto: usuario.foto,
        sobre: usuario.sobre || ''
    });

    useEffect(() => {
        if (token === "") {
            ToastAlerta('Você precisa estar logado', "info")
            navigate("/login")
        }
    }, [token, navigate]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setPerfil({
            ...perfil,
            [e.target.name]: e.target.value
        })
    }

    async function atualizarPerfil(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        try {
            await atualizar(`/usuarios/atualizar`, perfil, (dados: Usuario) => {
                // Atualiza o estado global com os novos dados
                // Mantemos o token atual, pois a resposta da atualização pode não vir com ele
                setUsuario({
                    ...dados,
                    token: token,
                    id: dados.id || usuario.id // Garante que o ID não se perca se o backend devolver incompleto
                } as UsuarioLogin);
            }, {
                headers: { Authorization: token }
            });

            ToastAlerta("Perfil atualizado com sucesso!", "sucesso");
            navigate("/perfil");
        } catch (error: unknown) {
            console.error("Erro ao atualizar perfil:", error);
            const errorObj = error as { response?: { data?: { message?: string } } };
            const message = errorObj.response?.data?.message || "Erro ao atualizar o perfil.";
            ToastAlerta(message, "erro");
        }

        setIsLoading(false);
    }

    return (
        <div className="container flex flex-col mx-auto items-center justify-center transition-colors duration-300">
            <h1 className="text-4xl text-center my-8 dark:text-white font-bold">Editar Perfil</h1>

            <form className="flex flex-col w-full px-4 lg:w-1/2 gap-4" onSubmit={atualizarPerfil}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="nome" className="dark:text-slate-100 font-semibold">Nome Completo</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        placeholder="Nome"
                        className="border-2 border-slate-700 rounded p-2 bg-white dark:bg-slate-800 dark:text-white transition-colors focus:ring-2 focus:ring-indigo-500 outline-none"
                        value={perfil.nome}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="usuario" className="dark:text-slate-100 font-semibold">Usuário (E-mail)</label>
                    <input
                        type="email"
                        id="usuario"
                        name="usuario"
                        placeholder="usuario@email.com"
                        className="border-2 border-slate-700 rounded p-2 bg-white dark:bg-slate-800 dark:text-white transition-colors focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
                        value={perfil.usuario}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="senha" className="dark:text-slate-100 font-semibold">Nova Senha (Opcional)</label>
                    <input
                        type="password"
                        id="senha"
                        name="senha"
                        placeholder="Mínimo 8 caracteres para alterar"
                        className="border-2 border-slate-700 rounded p-2 bg-white dark:bg-slate-800 dark:text-white transition-colors focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
                        value={perfil.senha}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                    <p className="text-xs text-slate-500 dark:text-slate-400">Deixe em branco para manter a senha atual.</p>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="foto" className="dark:text-slate-100 font-semibold">URL da Foto</label>
                    <input
                        type="text"
                        id="foto"
                        name="foto"
                        placeholder="URL da foto"
                        className="border-2 border-slate-700 rounded p-2 bg-white dark:bg-slate-800 dark:text-white transition-colors focus:ring-2 focus:ring-indigo-500 outline-none"
                        value={perfil.foto}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="sobre" className="dark:text-slate-100 font-semibold">Sobre (Bio)</label>
                    <textarea
                        id="sobre"
                        name="sobre"
                        rows={3}
                        placeholder="Conte um pouco sobre você..."
                        className="border-2 border-slate-700 rounded p-2 bg-white dark:bg-slate-800 dark:text-white transition-colors focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                        value={perfil.sobre}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => atualizarEstado(e)}
                    />
                </div>
                
                <div className="mt-4 flex gap-4">
                    <button
                        type="button"
                        onClick={() => navigate("/perfil")}
                        className="w-full bg-slate-400 hover:bg-slate-600 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-bold py-2 rounded transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 rounded flex justify-center items-center transition-colors shadow-lg active:scale-95"
                    >
                        {isLoading ? (
                            <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="24" visible />
                        ) : (
                            <span>Salvar Alterações</span>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FormPerfil;
