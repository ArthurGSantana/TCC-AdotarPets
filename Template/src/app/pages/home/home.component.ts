import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators'
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { PetsModel } from './../../shared/interfaces/Pets.model';
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
  petsFilter: PetsModel[] = [];
  guardPets: PetsModel[] = [];

  debounceSearch: Subject<any> = new Subject<any>();

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

    this.getAllPets();

  };

  getAllPets(): void {
    Swal.fire({
      title: 'Aguarde...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      },
    });
    this.homeServ.getAllPets().subscribe(res => {
      this.allPets = res;
      this.guardPets = res;
      Swal.close();
    }, error => {
      console.log(error);
    });
  };

  allControl(): void{
    this.allSelecionado === "Sim, me mostre todos!" ? this.mostraTodos = true : this.mostraTodos = false;
  };

  procurarPets(): void {
    Swal.fire({
      title: 'Carregando Pets...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      },
  });
    this.allPets = this.guardPets;
    if(this.mostraTodos){
      this.getAllPets();
    } else {
      let petAux = [];
      if(this.cidadeSelecionada) petAux.push(this.cidadeSelecionada)
      if(this.porteSelecionado) petAux.push(this.porteSelecionado)
      if(this.sexoSelecionado) petAux.push(this.sexoSelecionado)
      if(this.especieSelecionada) petAux.push(this.especieSelecionada)

      petAux.forEach((attr, index) => {
        if(petAux.length > 1 && index > 0) {
          this.allPets = this.petsFilter;
          this.petsFilter = [];
          console.log(this.allPets)
        }
        this.allPets.forEach(pet => {
          let objValues = Object.values(pet);
          let indexPet = objValues.find(item => item === attr);
          if(indexPet) this.petsFilter.push(pet);
        });
      });

      this.allPets = this.petsFilter;

      this.petsFilter = [];
      Swal.close();
    };
  };

}
