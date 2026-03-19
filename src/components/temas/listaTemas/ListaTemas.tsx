import { useContext, useEffect, useState, useCallback } from "react";
import { DNA } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Tema from "../../../models/Tema";
import { buscar } from "../../../services/Service";
import CardTemas from "../cardTemas/CardTemas";
import { ToastAlerta } from "../../../utils/ToastAlerts";


function ListaTemas() {

    const navigate = useNavigate();

    const [temas, setTemas] = useState<Tema[]>([])

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    const buscarTemas = useCallback(async () => {
        try {
            await buscar('/temas', setTemas, {
                headers: { Authorization: token }
            })
        } catch (error) {
            if (error?.toString().includes('403')) {
                ToastAlerta('O token Expirou!', "erro")
                handleLogout()
            }
        }
    }, [token, handleLogout]);

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado!', "")
            navigate('/')
        }
    }, [token, navigate])

    useEffect(() => {
        buscarTemas()
    }, [temas.length, buscarTemas])

    return (
        <>
            {temas.length === 0 && (
                <DNA
                    visible={true}
                    height="200"
                    width="200"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper mx-auto"
                />
            )}
            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {temas.map((tema) => (
                            <CardTemas key={tema.id} tema={tema} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListaTemas;