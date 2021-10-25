import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { HomeService } from './../../../../../home/shared/home.service';

@Component({
  selector: 'app-editar-pets',
  templateUrl: './editar-pets.component.html',
  styleUrls: ['./editar-pets.component.scss']
})
export class EditarPetsComponent implements OnInit {

  petForm!: FormGroup;
  pet: any;

  cidades: string[] = [""];
  especies: string[] = [""];
  portes: string[] = [""];
  sexo: string[] = [""];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private homeService: HomeService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.cidades = this.homeService.cidades;
    this.especies = this.homeService.especies;
    this.portes = this.homeService.portes;
    this.sexo = this.homeService.sexo;

    this.pet = this.data.dataInfo;
    this.createForms();
  }

  createForms(): void {
    this.petForm = this.formBuilder.group({
      especie: [this.pet.especie, [Validators.required]],
      idade: [this.pet.idade, [Validators.required]],
      sexo: [this.pet.sexo, [Validators.required]],
      porte: [this.pet.porte, [Validators.required]],
      cidade: [this.pet.cidade, [Validators.required]]
    });
  };

  saveEdit(): void {
    Swal.fire({
      title: 'Salvando...',
      allowOutsideClick: false,
      didOpen: () => { Swal.showLoading() },
    });

    let ong = sessionStorage.getItem('ong');
    let newPet = this.petForm.value;

    newPet.imagem = this.pet.imagem;
    newPet.ong = ong;

    this.homeService.editPet(this.pet.id, newPet).then(res => {
      Swal.close();
      Swal.fire({
        title: 'Edição realizada com sucesso!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      }).then(value => {
        this.dialog.closeAll();
      });
    });
  };

}
