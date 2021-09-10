import { HomeService } from './../../../home/shared/home.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adicionar-pet',
  templateUrl: './adicionar-pet.component.html',
  styleUrls: ['./adicionar-pet.component.scss']
})
export class AdicionarPetComponent implements OnInit {

  cidades: string[] = [""];
  especies: string[] = [""];
  portes: string[] = [""];
  sexo: string[] = [""];

  cidadeSelect!: string;
  especieSelect!: string;
  porteSelect!: string;
  sexoSelect!: string;
  idade!: number;

  constructor(
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.cidades = this.homeService.cidades;
    this.especies = this.homeService.especies;
    this.portes = this.homeService.portes;
    this.sexo = this.homeService.sexo;
  }

}
