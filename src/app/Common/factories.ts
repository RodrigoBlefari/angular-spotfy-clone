import { IArtista } from "../interfaces/IArtistas";

export function newArtista(): IArtista {
    return{
        id: '',
        nome: '',
        imagemUrl: ''
    }
}