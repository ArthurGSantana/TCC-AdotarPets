import { FormBuilder, FormGroup } from '@angular/forms';
import { PetsModel } from './../../shared/interfaces/Pets.model';
import { Component, OnInit } from '@angular/core';

import { HomeService } from './shared/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  estados: string[] = [""];
  cidades: string[] = [""];
  especies: string[] = [""];
  portes: string[] = [""];
  sexo: string[] = [""];
  all: string[] = [""];

  estadoSelecionado: string = "";
  cidadeSelecionada: string = "";
  especieSelecionada: string = "";
  porteSelecionado: string = "";
  sexoSelecionado: string = "";
  allSelecionado: string = "";

  mostraTodos: boolean = false;
  formPets!: FormGroup;

  allPets: PetsModel[] = [];

  constructor(
    private homeServ: HomeService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.estados = this.homeServ.estados;
    this.cidades = this.homeServ.cidades;
    this.especies = this.homeServ.especies;
    this.portes = this.homeServ.portes;
    this.sexo = this.homeServ.sexo;
    this.all = this.homeServ.all;

    this.homeServ.getAllPets().subscribe(res => {
      this.allPets = res;
      console.log(res)
    }, error => {
      console.log(error);
    });

  };

  allControl(): void{
    this.allSelecionado === "Sim, me mostre todos!" ? this.mostraTodos = true : this.mostraTodos = false;
  };

  onSubmit(): void {
    console.log(this.formPets.value)
  }

}
