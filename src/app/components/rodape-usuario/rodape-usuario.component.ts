import { Component, Input, OnInit } from '@angular/core';
import {
  faGuitar, faSignOut, faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import { IUsuario } from 'src/app/interfaces/IUsuarios';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-rodape-usuario',
  templateUrl: './rodape-usuario.component.html',
  styleUrls: ['./rodape-usuario.component.scss']
})
export class RodapeUsuarioComponent implements OnInit {
 
  sairIcone = faSignOut;
  usuario: IUsuario = null;
 
  constructor(
    private SpotifyService: SpotifyService
  ) { }

  ngOnInit(): void {
    this.usuario = this.SpotifyService.usuario;
  }

  logout(){
    this.SpotifyService.logout();
  }
}
