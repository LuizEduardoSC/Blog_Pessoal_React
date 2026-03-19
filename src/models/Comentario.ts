import Postagem from "./Postagem";
import Usuario from "./Usuario";

export default interface Comentario {
    id: number;
    texto: string;
    data: string;
    usuario: Usuario | null;
    postagem: Postagem | null;
}
