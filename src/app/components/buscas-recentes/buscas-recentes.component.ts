import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscas-recentes',
  templateUrl: './buscas-recentes.component.html',
  styleUrls: ['./buscas-recentes.component.scss'],
})
export class BuscasRecentesComponent implements OnInit {
  pesquisasRecentes = [
    'Top Brasil',
    'Top Global',
    'Esquenta Sertaneja',
    'Funk hits',
    'Musica para Programadores',
  ];

  campoPesquisa = '';

  constructor() {}

  ngOnInit(): void {}

  definirPesquisa(pesquisa: string){
    this.campoPesquisa = pesquisa;
    this.buscar();
  }
  buscar(){
    console.log(this.campoPesquisa);
  }
}
