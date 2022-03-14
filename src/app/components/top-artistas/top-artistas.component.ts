import { Component, OnInit } from '@angular/core';
import { IArtista } from 'src/app/interfaces/IArtistas';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-top-artistas',
  templateUrl: './top-artistas.component.html',
  styleUrls: ['./top-artistas.component.scss']
})
export class TopArtistasComponent implements OnInit {
  topArtistas: Array<IArtista>;

  constructor(
    private spotifyService: SpotifyService
  ) { }

  ngOnInit(): void {
    this.buscarTopArtistas();
  }

  async buscarTopArtistas(){
    const topArtistas = await this.spotifyService.buscarTopArtista(5);
    this.topArtistas = topArtistas;
  }

  buscarArtista(artista: IArtista){
    alert('Em processo de desenvolvimento..');
    console.log(artista); 
  }
}
