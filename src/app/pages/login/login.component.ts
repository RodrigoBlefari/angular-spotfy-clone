import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  errorTokenAcesso = false;

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
      this.errorTokenAcesso = true;
      this.router.navigate(['/login']);
    }
  }

  abrirPaginaLogin() {

      window.location.href = this.spotifyService.obterUrlLogin();
  }

}
