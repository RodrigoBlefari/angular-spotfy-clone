import { IArtista } from "../interfaces/IArtistas";
import { IMusica } from "../interfaces/IMusica";
import { IPlaylist } from "../interfaces/IPlaylist";

export function newArtista(): IArtista {
    return{
        id: '',
        nome: '',
        imagemUrl: '',
        musicas: []
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

export function newPlaylist(): IPlaylist{
    return {
        id: '',
        nome: '',
        imagemUrl: '',
        musicas: []
    }
}