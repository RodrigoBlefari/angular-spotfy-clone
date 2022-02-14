import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private spotifyService : SpotifyService) { }

  ngOnInit(): void {
    this.obterTokenUrlCallback();
  }

  obterTokenUrlCallback(){
    const token = this.spotifyService.obterTokenUrlCallback();
    if(!!token){
      console.log('token' + token);
      this.spotifyService.definirAcessoToken(token);
    }
  }

  abrirPaginaLogin() {
      window.location.href = this.spotifyService.obterUrlLogin();
  }

}
