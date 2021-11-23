import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { HomeService } from './../../../../../home/shared/home.service';

@Component({
  selector: 'app-procura',
  templateUrl: './procura.component.html',
  styleUrls: ['./procura.component.scss']
})
export class ProcuraComponent implements OnInit {

  imageFiles: any;
  imageNow: any;
  controler: number = 0;
  ong: any;
  close: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private homeService: HomeService,
    private dialogRef: MatDialogRef<ProcuraComponent>
  ) { }

  ngOnInit() {
    this.imageFiles = this.data.dataInfo.pet.files;
    this.imageNow = this.imageFiles[this.controler];
    this.ong = sessionStorage.getItem('ong');
  }

  carrousel(type: string): void {
    if(this.imageFiles.length > 1) {
      if(type === 'left') {
        if(this.controler === 0) {
          this.controler = this.imageFiles.length - 1;
          this.imageNow = this.imageFiles[this.controler];
        } else {
          this.controler = this.controler - 1;
          this.imageNow = this.imageFiles[this.controler];
        }
      } else if(type === 'right') {
        if(this.controler === this.imageFiles.length - 1) {
          this.controler = 0;
          this.imageNow = this.imageFiles[this.controler];
        } else {
          this.controler = this.controler + 1;
          this.imageNow = this.imageFiles[this.controler];
        };
      };
    };
  };

  deleteNotify(): void {
    this.ong = sessionStorage.getItem('ong');
    Swal.fire({
      title: 'Deseja excluir a notificação?',
      text: "Você não poderá reverter isso depois!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then(result => {
      if (result.isConfirmed) {
        this.homeService.deleteNotification(this.ong, this.data.dataInfo.id).then(res => {
          Swal.fire({
            title: 'Exclusão realizada com sucesso!',
            icon: 'success',
            showConfirmButton: false,
            timer: 1000
          }).then(result => {
            this.dialogRef.close('excluir');
          });
        })
      };
    });
  };
}
