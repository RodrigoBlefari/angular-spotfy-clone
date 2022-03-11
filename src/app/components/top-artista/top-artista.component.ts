import { Component, OnInit } from '@angular/core';
import { newArtista } from 'src/app/Common/factories';
import { IArtista } from 'src/app/interfaces/IArtistas';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-top-artista',
  templateUrl: './top-artista.component.html',
  styleUrls: ['./top-artista.component.scss']
})
export class TopArtistaComponent implements OnInit {

  topArtista: IArtista = newArtista();

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.buscarArtistas();
  }
  async buscarArtistas(){
    const artistas = await this.spotifyService.buscarTopArtistas(1);
    if(!!artistas){
      this.topArtista = artistas.pop();
    }
    console.log(this.topArtista);
    
  }
}
