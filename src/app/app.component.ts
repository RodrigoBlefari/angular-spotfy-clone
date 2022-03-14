import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from './services/spotify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'spotfyangularclone';
  
  constructor(
    private spotifyService : SpotifyService,
    private router: Router  
  ) { }

  ngOnInit(): void {

    this.obterTokenUrlCallback();
  }

  obterTokenUrlCallback(){
    const token = this.spotifyService.obterTokenUrlCallback();
    

    if(!!token){
      this.spotifyService.definirAcessoToken(token);
      this.router.navigate(['/player/home']);
    } else {
      console.log('Para entrar na aplicação é necessário mandar email de login do Spotify para liberar na API, (rodrigo.blefari@gmail.com) Obrigado.')
      this.router.navigate(['/login']);
    }
  }

  abrirPaginaLogin() {

      window.location.href = this.spotifyService.obterUrlLogin();
  }

}
