import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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
