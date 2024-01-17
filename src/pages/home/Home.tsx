
function Home() {

    return (
        <>
            <div className="
            bg-indigo-900 
            flex 
            justify-center">
                <div className="
                container 
                grid 
                grid-cols-2 
                text-white">
                    <div id="texto" className="
                    flex 
                    flex-col 
                    gap-4 
                    items-center 
                    justify-center 
                    py-4">
                        <h2 className="
                        text-5xl
                        font-bold
                        ">Seja Bem Vindo!</h2>
                        <p className="text-xl">Expresse aqui os seus pensamentos e opiniões</p>
                        <div className="
                        flex 
                        justify-around 
                        gap-4">
                            <button className="
                            rounded 
                            bg-white 
                            text-blue-800 
                            py-2 
                            px-4">Nova Postagem
                            </button>
                        </div>
                    </div>

                    <div id="imagem" className="flex justify-center">
                        <img
                            src="https://i.imgur.com/VpwApCU.png"
                            alt="Imagem da Página Home"
                            className="w-2/3"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home