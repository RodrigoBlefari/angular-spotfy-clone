import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environment';

import Spotify from 'spotify-web-api-js';
import { IUsuario } from '../interfaces/IUsuarios';
import {
  SpotifyArtistaParaArtista,
  SpotifyPlaylistParaPlaylist,
  SpotifySinglePlaylistParaPLaylist,
  SpotifyTrackParaMusica,
  SpotifyUserParaUsuario,
} from '../Common/spotifyHelper';
import { IPlaylist } from '../interfaces/IPlaylist';
import { Router } from '@angular/router';
import { IArtista } from '../interfaces/IArtistas';
import { IMusica } from '../interfaces/IMusica';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  spotifyApi: Spotify.SpotifyWebApiJs = null;
  usuario: IUsuario;

  constructor(private router: Router) {
    this.spotifyApi = new Spotify();
  }

  async inicializarUsuario() {
    if (!!this.usuario) {
      return true;
    }

    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      this.definirAcessoToken(token);
      await this.obterSpotifyUsuario();
      return !!this.usuario;
    } catch (ex) {
      return false;
    }
  }

  async obterSpotifyUsuario() {
    const userInfo = await this.spotifyApi.getMe();
    this.usuario = SpotifyUserParaUsuario(userInfo);
  }

  obterUrlLogin() {
    alert('dsadsa');
    const authEndpoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndpoint + clientId + redirectUrl + scopes + responseType;
  }

  obterTokenUrlCallback() {
    console.log('entrou call back');
    
    if (!window.location.hash) {
      return '';
    }

    const params = window.location.hash.substring(1).split('&');
    console.log('params', params);
  
    return params[0].split('=')[1];
    
  }

  definirAcessoToken(token: string) {
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('token', token);
  }

  async buscarPlaylistUsuario(offset = 0, limit = 50): Promise<IPlaylist[]> {
    const playlists = await this.spotifyApi.getUserPlaylists(this.usuario.id, {
      offset,
      limit,
    });
    return playlists.items.map((x) => SpotifyPlaylistParaPlaylist(x));
  }

  async buscarMusicasPlaylist(playlistId: string, offset = 0, limit = 50) {
    const playlistSpotify = await this.spotifyApi.getPlaylist(playlistId);

    if (!playlistSpotify) return null;

    const playlist = SpotifySinglePlaylistParaPLaylist(playlistSpotify);

    const musicaSpotify = this.spotifyApi.getPlaylistTracks(playlistId, {
      offset,
      limit,
    });

    playlist.musicas = (await musicaSpotify).items.map((musica) =>
      SpotifyTrackParaMusica(musica.track as SpotifyApi.TrackObjectFull)
    );

    return playlist;
  }

  async buscarTopArtista(limit = 10): Promise<IArtista[]> {
    const artistas = await this.spotifyApi.getMyTopArtists({ limit });
    return artistas.items.map(SpotifyArtistaParaArtista);
  }

  async buscarMusicas(offset = 0, limit = 50): Promise<IMusica[]> {
    const musicas = await this.spotifyApi.getMySavedTracks({ offset, limit });

    return musicas.items.map((x) => SpotifyTrackParaMusica(x.track));
  }

  async executarMusica(musicaId: string) {
    await this.spotifyApi.queue(musicaId);
    await this.spotifyApi.skipToNext();
  }

  async obterMusicaAtual(): Promise<IMusica> {
    const musicaSpotify = await this.spotifyApi.getMyCurrentPlayingTrack();
    return SpotifyTrackParaMusica(musicaSpotify.item);
  }

  async voltarMusica() {
    await this.spotifyApi.skipToPrevious();
  }

  async proximaMusica() {
    await this.spotifyApi.skipToNext();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
