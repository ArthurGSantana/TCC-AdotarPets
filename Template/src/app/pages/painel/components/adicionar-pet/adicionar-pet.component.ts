import { Account } from './../../../../shared/interfaces/account.model';
import { LoginService } from './../../../login/shared/login.service';
import { PetsModel } from './../../../../shared/interfaces/Pets.model';
import { HomeService } from './../../../home/shared/home.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

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
  ongSelected: any;
  dataOng: any;

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

    this.ongSelected = sessionStorage.getItem('login');

    this.loginService.getDataAccount(this.ongSelected).subscribe(res => {
      this.dataOng = res;
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
        ong: this.ongSelected
      };

      Swal.fire({
        title: 'Inserir novo Pet?',
        text: "Você poderá excluir esse registro futuramente.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
      }).then((result) => {
        if (result.isConfirmed) {
          this.homeService.createNewPet(this.pet);
          this.updateOng();
          this.clearFields();
          Swal.fire({
            icon: 'success',
            title: 'Seu novo Pet foi adicionado!',
            showConfirmButton: false,
            timer: 1500
          });
        };
      });

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Campos Obrigatórios!',
        text: 'Todos os campos precisam ser preenchidos.',
        showConfirmButton: true,
        confirmButtonText: 'Entendi'
      });
    };
  };

  clearFields(): void {
    this.cidadeSelect = '';
    this.especieSelect = '';
    this.porteSelect = '';
    this.sexoSelect = '';
    this.idade = '';
    this.preview = '';
  };

  updateOng(): void {
    this.dataOng.cadastrados = this.dataOng.cadastrados + 1;

    if(this.especieSelect === 'Cachorro') {
      this.dataOng.cachorros = this.dataOng.cachorros + 1;
    } else {
      this.dataOng.gatos = this.dataOng.gatos + 1;
    };

    this.loginService.updateCount(this.dataOng, this.ongSelected).then(res => {
      
    })
  }

}
