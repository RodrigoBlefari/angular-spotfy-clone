import { IPlaylist } from '../interfaces/IPlaylist';
import { IUsuario } from '../interfaces/IUsuarios';

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
