import { HomeService } from './../../../../../home/shared/home.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-info-notify',
  templateUrl: './info-notify.component.html',
  styleUrls: ['./info-notify.component.scss']
})
export class InfoNotifyComponent implements OnInit {

  ong: any = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private homeService: HomeService,
    private dialogRef: MatDialogRef<InfoNotifyComponent>
  ) { }

  ngOnInit() {
    this.ong = sessionStorage.getItem('ong');
  }

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
