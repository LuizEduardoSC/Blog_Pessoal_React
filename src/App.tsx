import { Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import DeletarPostagem from './components/postagens/deletarPostagem/DeletarPostagem';
import FormPostagem from './components/postagens/formPostagem/FormPostagem';
import ListaPostagens from './components/postagens/listaPostagens/ListaPostagens';
import DeletarComentario from './components/comentarios/deletarComentario/DeletarComentario';
import DeletarTema from './components/temas/deletarTemas/DeletarTemas';
import FormTema from './components/temas/formTemas/FormTemas';
import ListaTemas from './components/temas/listaTemas/ListaTemas';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Cadastro from './pages/cadastro/Cadastro';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Perfil from './pages/perfil/Perfil';
import PostagemDetalhe from './pages/postagem/PostagemDetalhe';
import FormPerfil from './components/perfil/formPerfil/FormPerfil';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const location = useLocation();

  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastContainer />
        <Navbar />
        <div className="min-h-[80vh] transition-colors duration-300">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/login" element={<Login />} />
                <Route path="/temas" element={<ListaTemas />} />
                <Route path="/cadastrartema" element={<FormTema />} />
                <Route path="/editartema/:id" element={<FormTema />} />
                <Route path="/deletartema/:id" element={<DeletarTema />} />
                <Route path="/postagens" element={<ListaPostagens />} />
                <Route path="/cadastrarPostagem" element={<FormPostagem />} />
                <Route path="/editarPostagem/:id" element={<FormPostagem />} />
                <Route path="/deletarPostagem/:id" element={<DeletarPostagem />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/editarperfil" element={<FormPerfil />} />
                <Route path="/postagem/:id" element={<PostagemDetalhe />} />
                <Route path="/deletarcomentario/:id" element={<DeletarComentario />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </div>
        <Footer />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App
