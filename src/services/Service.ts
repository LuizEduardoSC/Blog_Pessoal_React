import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

export const cadastrarUsuario = async <T>(url: string, dados: object, setDados: (dados: T) => void) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}

export const login = async <T>(url: string, dados: object, setDados: (dados: T) => void) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}

export const buscar = async <T>(url: string, setDados: (dados: T) => void, header: object) => {
    const resposta = await api.get(url, header)
    
    // Se a resposta for paginada (Spring Data Page), extraímos o 'content' por padrão
    if (resposta.data && Array.isArray(resposta.data.content)) {
        setDados(resposta.data.content as T)
    } else {
        setDados(resposta.data)
    }
}

export interface PageResponse<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
}

export const buscarPaginado = async <T>(url: string, setDados: (dados: PageResponse<T>) => void, header: object) => {
    const resposta = await api.get(url, header)
    setDados(resposta.data)
}

export const cadastrar = async <T>(url: string, dados: object, setDados: (dados: T) => void, header: object) => {
    const resposta = await api.post(url, dados, header)
    setDados(resposta.data)
}

export const atualizar = async <T>(url: string, dados: object, setDados: (dados: T) => void, header: object) => {
    const resposta = await api.put(url, dados, header)
    setDados(resposta.data)
}

export const deletar = async (url: string, header: object) => {
    await api.delete(url, header)
}

export { api };