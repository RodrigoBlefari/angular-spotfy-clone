import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRotas } from './app-routes';

import { AppComponent } from './app.component';
import { PainelEsquerdoComponent } from './components/painel-esquerdo/painel-esquerdo.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRotas)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
