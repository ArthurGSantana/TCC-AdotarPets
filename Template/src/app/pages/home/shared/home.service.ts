import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor() { }

  estados: string[] = ["São Paulo"];
  cidades: string[] = ["Batatais", "São Joaquim da Barra"];
  especies: string[] = ["Cachorro", "Gato", "Salamandra"];
  portes: string[]= ["Pequeno", "Médio", "Grande"];
  sexo: string[] = ["Fêmea", "Macho"];
  all: string[] = ["Não, já sei o que eu quero!", "Sim, me mostre todos!"];

}
