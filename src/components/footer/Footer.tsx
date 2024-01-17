import { FacebookLogo, InstagramLogo, LinkedinLogo } from '@phosphor-icons/react'
import { GithubLogo } from 'phosphor-react'

function Footer() {



    return (
        <>
            <div className="flex justify-center bg-indigo-900 text-white">
                <div className="container flex flex-col items-center py-4">
                    <p className='text-xl font-bold'>Blog pessoal Generation | Copyright: </p>
                    <p className='text-lg'>Acesse nossas redes sociais</p>
                    <div className='flex gap-2'>
                        <a href="https://github.com/LuizEduardoSC" target="_blank"><GithubLogo size={48} weight='bold' /></a>
                        <a href="https://www.linkedin.com/in/luiz-eduardosc/" target="_blank"><LinkedinLogo size={48} weight='bold' /></a>
                        <a href=""><InstagramLogo size={48} weight='bold' /></a>
                        <a href=""><FacebookLogo size={48} weight='bold' /></a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer