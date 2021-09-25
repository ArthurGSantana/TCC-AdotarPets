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
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.clientForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      city: ['', [Validators.required, Validators.minLength(2)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      phone: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit(): void {
    Swal.fire({
      icon: 'success',
      title: 'Solicitação feita!',
      allowOutsideClick: false,
      showConfirmButton: false,
      timer: 1500
    })
    console.log(this.clientForm)
  }

}
