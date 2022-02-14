import { Injectable } from '@angular/core';
import { SpotfyConfiguration } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor() { }

  obterUrlLogin() {
    const authEndpoint = `${SpotfyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotfyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotfyConfiguration.redirectUrl}&`;
    const scopes = `scopes=${SpotfyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndpoint + clientId + redirectUrl + scopes + responseType;
  }

  obterTokenUrlCallback() {
    console.log(window.location.hash);
    
    if(!window.location.hash){
      return '';
    }
    return '';

    const params = window.location.href.substring(1).split;
  }
}
