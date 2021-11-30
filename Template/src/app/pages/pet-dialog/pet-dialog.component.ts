import { Subject } from 'rxjs';
import { HomeService } from './../home/shared/home.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PetsModel } from './../../shared/interfaces/Pets.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pet-dialog',
  templateUrl: './pet-dialog.component.html',
  styleUrls: ['./pet-dialog.component.scss']
})
export class PetDialogComponent implements OnInit {

  clientForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private homeService: HomeService
  ) { }

  ngOnInit() {
    this.clientForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      city: ['', [Validators.required, Validators.minLength(2)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      phone: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      pet: [this.data.pet],
      ativo: [1]
    });
  }

  onSubmit(): void {
    Swal.fire({
      title: 'Enviar Solicitação?',
      text: "Se aceitar, uma mensagem será enviada até a ONG responsável com seus dados para que eles entrem em contato com você!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Solicitar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Salvando dados...',
          allowOutsideClick: false,
          didOpen: () => { Swal.showLoading() },
        });
        let values = this.clientForm.value;
        values.phone = `+55${values.phone}`;
        let ong = this.data.pet.ong
        this.homeService.createNotification(values, ong);
        Swal.close();
        Swal.fire({
          icon: 'success',
          title: 'Solicitação feita com sucesso!',
          allowOutsideClick: false,
          showConfirmButton: false,
          timer: 1500
        });
      };
    });
  };

}
