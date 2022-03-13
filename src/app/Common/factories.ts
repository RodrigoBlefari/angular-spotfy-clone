import { IArtista } from "../interfaces/IArtistas";
import { IMusica } from "../interfaces/IMusica";

export function newArtista(): IArtista {
    return{
        id: '',
        nome: '',
        imagemUrl: ''
    }
}

export function newMusica(): IMusica {
    return{
        id: '',
        titulo: '',
        artistas: [],
        album: {
            id: '',
            nome: '',
            imagemUrl: ''
        },
        tempo: ''
    }
}