import { Account } from './../../../../shared/interfaces/account.model';
import { LoginService } from './../../../login/shared/login.service';
import { PetsModel } from './../../../../shared/interfaces/Pets.model';
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
  idade!: string;
  onAccount!: Account;

  file!: File;
  preview!: string;

  pet: PetsModel = {
    imagem: '',
    cidade: '',
    idade: '',
    porte: '',
    sexo: '',
    especie: '',
    ong: ''
  };

  constructor(
    private homeService: HomeService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.cidades = this.homeService.cidades;
    this.especies = this.homeService.especies;
    this.portes = this.homeService.portes;
    this.sexo = this.homeService.sexo;

    this.loginService.loginEvent.subscribe(res => {
      this.onAccount = res;
    });
  }

  getFileImage(event: any): void{
    let imgfile = event.target.files[0] as File
    this.file = imgfile;
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.preview = event.target.result;
      this.pet.imagem = this.preview;
    };
    reader.readAsDataURL(imgfile);
  };

  salvarPet(): void {
    if(this.cidadeSelect && this.especieSelect && this.porteSelect && this.sexoSelect && this.idade && this.preview) {
      this.pet = {
        especie: this.especieSelect,
        idade: this.idade,
        imagem: this.preview,
        porte: this.porteSelect,
        sexo: this.sexoSelect,
        cidade: this.cidadeSelect,
        ong: this.onAccount.ong
      };

      this.homeService.createNewPet(this.pet);
    }
  }

}
