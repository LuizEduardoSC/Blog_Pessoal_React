import { ReactNode, createContext, useEffect, useState } from "react";
import UsuarioLogin from "../models/UsuarioLogin";
import { login } from "../services/Service";
import { ToastAlerta } from "../utils/ToastAlerts";

interface AuthContextProps {
    usuario: UsuarioLogin
    handleLogout(): void
    handleLogin(usuario: UsuarioLogin): Promise<void>
    isLoading: boolean
}

interface AuthProvidersProps {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

const usuarioInicial: UsuarioLogin = {
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
    token: ''
}

export function AuthProvider({ children }: AuthProvidersProps) {

    const [usuario, setUsuario] = useState<UsuarioLogin>(() => {
        const storedUser = localStorage.getItem('usuario')
        return storedUser ? JSON.parse(storedUser) : usuarioInicial
    })

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (usuario.token !== '') {
            localStorage.setItem('usuario', JSON.stringify(usuario))
        }
    }, [usuario])

    async function handleLogin(userLogin: UsuarioLogin) {
        setIsLoading(true)

        try {
            await login(`/usuarios/logar`, userLogin, setUsuario)
            ToastAlerta("Usuário foi autenticado com sucesso!", "sucesso")
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            ToastAlerta("Os dados do Usuário estão inconsistentes!", "erro")
            setIsLoading(false)
        }
    }

    function handleLogout() {
        localStorage.removeItem('usuario')
        setUsuario(usuarioInicial)
    }

    return(
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading}}>
            {children}
        </AuthContext.Provider>
    )
}