import { Link } from "react-router-dom";
import ListaPostagens from "../../components/postagens/listaPostagens/ListaPostagens";
import ModalPostagem from "../../components/postagens/modalPostagem/ModalPostagem";

function Home() {
    return (
        <>
            <div id="container" className="flex bg-indigo-900 dark:bg-slate-900 justify-center transition-colors duration-300">
                <div id="subcontainer" className="container grid grid-cols-1 lg:grid-cols-2 text-white dark:text-slate-100 px-4">
                    <div id="texto" className="flex flex-col gap-4 items-center lg:items-start justify-center py-8 lg:py-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-center lg:text-left leading-tight">
                            Seja Bem Vindo!
                        </h2>
                        <p className="text-lg lg:text-xl text-center lg:text-left opacity-90">
                            Expresse aqui os seus pensamentos e opiniões
                        </p>

                        <div className="flex justify-center lg:justify-start gap-4 mt-4">
                            <ModalPostagem />
                            <Link 
                                to="/postagens" 
                                className="rounded bg-white text-indigo-800 font-bold py-2 px-6 hover:bg-indigo-100 transition-colors shadow-lg active:scale-95"
                            >
                                Ver Postagens
                            </Link>
                        </div>
                    </div>

                    <div id="imagem" className="flex justify-center items-center py-8 lg:py-0">
                        <img
                            src="https://i.imgur.com/VpwApCU.png"
                            alt="Imagem da Página Home"
                            className="w-3/4 lg:w-4/5 hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
                        />
                    </div>
                </div>
            </div>
            <ListaPostagens />
        </>
    );
}

export default Home