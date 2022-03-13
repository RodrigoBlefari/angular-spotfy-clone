import { addMilliseconds, format } from 'date-fns';
import { IArtista } from '../interfaces/IArtistas';
import { IMusica } from '../interfaces/IMusica';
import { IPlaylist } from '../interfaces/IPlaylist';
import { IUsuario } from '../interfaces/IUsuarios';
import { newMusica } from './factories';

export function SpotifyUserParaUsuario(
    user: SpotifyApi.CurrentUsersProfileResponse
): IUsuario {
    return {
        id: user.id,
        nome: user.display_name,
        imagemUrl: user.images.pop().url,
    };
}

export function SpotifyPlaylistParaPlaylist(
    playlist: SpotifyApi.PlaylistObjectSimplified
): IPlaylist {
    let imagemUrl = '';
    if (typeof playlist.images[0] != 'undefined') {
        imagemUrl = playlist.images.pop().url;
    }

    return {
        id: playlist.id,
        nome: playlist.name,
        imagemUrl: imagemUrl,
    };
}

export function SpotifyArtistaParaArtista(SpotifyArtista: SpotifyApi.ArtistObjectFull) : IArtista{
    return {
        id: SpotifyArtista.id,
        nome: SpotifyArtista.name,
        imagemUrl: SpotifyArtista.images.sort((a,b) => a.width - b.width).pop().url
    }
}

export function SpotifyTrackParaMusica(SpotifyTrack: SpotifyApi.TrackObjectFull) : IMusica{
    
    if(!SpotifyTrack)
        return newMusica();

    const msParaMinutos = (ms: number) => {
        const data = addMilliseconds(new Date(0), ms);
        return format(data, 'mm:ss');
    }
    
    return {
        id: SpotifyTrack.uri,
        titulo: SpotifyTrack.name,
        artistas: SpotifyTrack.artists.map(artista => ({
            id: artista.id,
            nome: artista.name
        })),
        album: {
            id: SpotifyTrack.id,
            nome: SpotifyTrack.album.name,
            imagemUrl: SpotifyTrack.album.images.shift().url
        },
        tempo: msParaMinutos(SpotifyTrack.duration_ms)
    }
}
