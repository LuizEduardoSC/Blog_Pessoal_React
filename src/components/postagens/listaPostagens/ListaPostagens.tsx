import { useContext, useEffect, useState, useCallback } from "react";
import { DNA } from "react-loader-spinner";
import { AuthContext } from "../../../contexts/AuthContext";
import Postagem from "../../../models/Postagem";
import { buscar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerts";
import CardPostagem from "../cardPostagem/CardPostagem";
import { useNavigate } from "react-router-dom";

function ListaPostagens() {

    const navigate = useNavigate();

    const [postagens, setPostagens] = useState<Postagem[]>([]);

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    const buscarPostagens = useCallback(async () => {
        try {
            await buscar('/postagens', setPostagens, {
                headers: {
                    Authorization: token,
                },
            })

        } catch (error) {
            if (error?.toString().includes('403')) {
                ToastAlerta('O token expirou, favor logar novamente', "erro")
                handleLogout()
            }
        }
    }, [token, handleLogout]);

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado', "")
            navigate('/');
        }
    }, [token, navigate])

    useEffect(() => {
        buscarPostagens()
    }, [postagens.length, buscarPostagens])

    return (
        <>
            {postagens.length === 0 && (
                <DNA
                    visible={true}
                    height="200"
                    width="200"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper mx-auto"
                />
            )}
            <div className='container mx-auto my-4 
                grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
            >
                {postagens.map((postagem) => (
                    <CardPostagem key={postagem.id} postagem={postagem} />
                ))}

            </div>
        </>
    );
}

export default ListaPostagens;