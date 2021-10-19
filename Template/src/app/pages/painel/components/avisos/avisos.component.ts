import { InfoNotifyComponent } from './components/info-notify/info-notify.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from './../../../login/shared/login.service';
import { HomeService } from './../../../home/shared/home.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-avisos',
  templateUrl: './avisos.component.html',
  styleUrls: ['./avisos.component.scss']

})
export class AvisosComponent implements OnInit {

  allNotifications: any[] = [];
  notifyAdocao: any[] = [];
  notifyAchado: any[] = [];
  notifyPerdido: any[] = [];
  user!: any;
  ong!: any;

  constructor(
    private homeService: HomeService,
    private loginService: LoginService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    Swal.fire({
      title: 'Buscando Notificações...',
      allowOutsideClick: false,
      didOpen: () => { Swal.showLoading() },
    });
    
    this.user = sessionStorage.getItem('login');
    this.ong = sessionStorage.getItem('ong');

    if(this.user) {
      this.getNotification();
    };
  };

  getNotification(): void {
    this.homeService.getNotification(this.ong).subscribe(result => {
      let objects = Object.entries(result);

      objects.forEach(array => {
        let newObj = JSON.parse(array[1]);
        newObj.id = array[0].toString();
        if(newObj?.type === 'achado') {
          this.notifyAchado.push(newObj);
        } else if(newObj?.type === 'perdido') {
          this.notifyPerdido.push(newObj);
        } else {
          this.notifyAdocao.push(newObj);
        };
      });
      /* result.forEach(item => {
        this.allNotifications.push(item);
        let objParse = Object.values(item);
        objParse.forEach(x => {
          this.allNotifications.push(x);
        })
      });
      this.allNotifications.forEach(item => {
        this.notify.push(JSON.parse(item));
      }); */

      Swal.close();
    });
  };

  openNotify(obj: any): void {
    this.matDialog.open(InfoNotifyComponent, {
      data: {
        dataInfo: obj
      },
      height: '500px',
      width: '700px',
      panelClass: 'info-notify'
    });
  };

}
