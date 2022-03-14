import { Component, OnDestroy, OnInit } from '@angular/core';
import { newMusica } from 'src/app/Common/factories';
import { IMusica } from 'src/app/interfaces/IMusica';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SpotifyService } from 'src/app/services/spotify.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-lista-musica',
  templateUrl: './lista-musica.component.html',
  styleUrls: ['./lista-musica.component.scss']
})
export class ListaMusicaComponent implements OnInit, OnDestroy {

  bannerTexto = '';
  bannerImagemUrl = '';

  musicas: IMusica[] = [];
  musicaAtual: IMusica = newMusica();

  title= '';

  //icones
  playIcone = faPlay;
  
  subs: Subscription[] = [];

  constructor(
    private activedRoute: ActivatedRoute,
    private spotifyService: SpotifyService,
    private playerService: PlayerService
  ) { }
  
  ngOnInit(): void {
    this.obterMusicas();
    this.obterMusicaAtual();
  }
  
  ngOnDestroy(): void {
    this.subs.forEach(subs => subs.unsubscribe());
  }

  obterMusicaAtual(){
    const sub = this.playerService.musicaAtual.subscribe(musica => {
      this.musicaAtual = musica;        
    })
    this.subs.push(sub);
}

  obterMusicas(){
    const sub = this.activedRoute.paramMap
    .subscribe(async params => {

      const tipo = params.get('tipo');
      const id =params.get('id');
      await this.obterDadosPagina(tipo, id);

    })
    
    this.subs.push(sub);
  }

  async obterDadosPagina(tipo: string, id: string){
    if(tipo === 'playlist')
    await this.obterDadosPlaylist(id)

    if(tipo === 'artista')
    await this.obterDadosArtista(id)
  }

  //2SaA7YTwTRurwrW4nv2mDA
  async obterDadosPlaylist(playlistId: string){
    const playlistMusicas = await this.spotifyService.buscarMusicasPlaylist(playlistId);
    this.definirDadosDaPagina(playlistMusicas.nome, playlistMusicas.imagemUrl, playlistMusicas.musicas);
    this.title ='Musicas Playlist: ' + playlistMusicas.nome;
  }

  async obterDadosArtista(artistaId: string){
    //Processo para desenvolver futuramente com base nos generos etc.
  }

  definirDadosDaPagina(bannerTexto: string, bannerImagemUrl: string, musicas: IMusica[]){
    this.bannerTexto = bannerTexto;
    this.bannerImagemUrl = bannerImagemUrl;
    this.musicas = musicas;    
  }

  obterArtistas(musica: IMusica){
    return musica.artistas.map(artista => artista.nome).join(', ');
  }

  async executarMusica(musica: IMusica) {
    await this.spotifyService.executarMusica(musica.id);
    this.playerService.definirMusicaAtual(musica);
  }

}
