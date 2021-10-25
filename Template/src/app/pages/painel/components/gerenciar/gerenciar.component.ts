import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { EditarPetsComponent } from './components/editar-pets/editar-pets.component';
import { LoginService } from './../../../login/shared/login.service';
import { HomeService } from './../../../home/shared/home.service';

@Component({
  selector: 'app-gerenciar',
  templateUrl: './gerenciar.component.html',
  styleUrls: ['./gerenciar.component.scss']
})
export class GerenciarComponent implements OnInit {

  allPets: any[] = [];
  ong: any;
  dataOng: any;

  constructor(
    private homeService: HomeService,
    private loginService: LoginService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getAllPets();
    this.ong = sessionStorage.getItem('ong')

    this.loginService.getDataAccount(this.ong).subscribe(res => {
      this.dataOng = res;
    });
  }

  getAllPets(): void {
    Swal.fire({
      title: 'Buscando Pets...',
      allowOutsideClick: false,
      didOpen: () => { Swal.showLoading() },
    });

    this.homeService.getAllPetsPainel().subscribe(res => {
      this.allPets = [];
      let objetoPets = Object.entries(res);
      objetoPets.forEach((item: any) => {
        if(item[1].ong === this.ong) {
          let novoPet = item[1];
          novoPet.id = item[0];
          this.allPets.push(novoPet);
        };
      });

      Swal.close();
    });
  };

  editarPet(pet: any): void {
    const dialogRef = this.dialog.open(EditarPetsComponent, {
      data: {
        dataInfo: pet
      },
      height: '500px',
      width: '500px',
      panelClass: 'info-notify'
    });
  };

  adotaPet(pet: any): void {
    Swal.fire({
      title: 'Atualizar esse Pet para Adotado?',
      text: "Ele será removido do seu painel!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then(result => {
      if(result.isConfirmed) {
        this.homeService.deletePet(pet.id).then(res => {
          Swal.fire({
            title: 'Atualização feita com sucesso!',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          });
        });
        this.updateOng('adotado');
      };
    });
  };

  excluirPet(pet: any): void {
    Swal.fire({
      title: 'Deseja excluir esse Pet?',
      text: "Você não poderá reverter isso depois!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then(result => {
      if(result.isConfirmed) {
        this.homeService.deletePet(pet.id).then(res => {
          Swal.fire({
            title: 'Exclusão realizada com sucesso!',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          });
        });
        this.updateOng('excluido');
      };
    });
  };

  updateOng(type: string): void {
    if(type === 'excluido') {
      this.dataOng.excluidos = this.dataOng.excluidos + 1;
    } else {
      this.dataOng.adotados = this.dataOng.adotados + 1;
    };

    this.loginService.updateCount(this.dataOng, this.ong);
  };

}
