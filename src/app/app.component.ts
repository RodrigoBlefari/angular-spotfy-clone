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
    console.log('callback On init entrou');
    
    this.obterTokenUrlCallback();
  }

  obterTokenUrlCallback(){
    const token = this.spotifyService.obterTokenUrlCallback();
    
    console.log('token call back', token);

    if(!!token){
      console.log('sucesso do token')
      this.spotifyService.definirAcessoToken(token);
      this.router.navigate(['/player/home']);
    } else {
      console.log(' else erro do token')
      this.router.navigate(['/login']);
    }
  }

  abrirPaginaLogin() {

      window.location.href = this.spotifyService.obterUrlLogin();
  }

}
