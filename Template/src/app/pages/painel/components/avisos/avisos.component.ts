import { ProcuraComponent } from './components/procura/procura.component';
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
  notifyAdocaoAux: any[] = [];
  notifyAchadoAux: any[] = [];
  notifyPerdidoAux: any[] = [];
  user!: any;
  ong!: any;
  control: number = 0;

  constructor(
    private homeService: HomeService,
    private loginService: LoginService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.user = sessionStorage.getItem('login');
    this.ong = sessionStorage.getItem('ong');

    if(this.user) {
      this.getNotification();
    };
  };

  getNotification(): void {
    Swal.fire({
      title: 'Buscando Notificações...',
      allowOutsideClick: false,
      didOpen: () => { Swal.showLoading() },
    });

    this.notifyAchado = [];
    this.notifyAdocao = [];
    this.notifyPerdido = [];

    this.homeService.getNotification(this.ong).subscribe(result => {
      if(result) {
        if(this.control === 0) {
          this.allNotifications = result;
          let objects = Object.entries(result);
          objects.forEach(array => {
            let newObj = array[1];
            newObj.id = array[0].toString();
            if(newObj?.type === 'achado') {
              this.notifyAchado.push(newObj);
            } else if(newObj?.type === 'perdido') {
              this.notifyPerdido.push(newObj);
            } else {
              this.notifyAdocao.push(newObj);
            };
          });
          
          this.notifyAchado = this.notifyAchado.reverse();
          this.notifyAdocao = this.notifyAdocao.reverse();
          this.notifyPerdido = this.notifyPerdido.reverse();
          this.control = 1;
          Swal.close();
        };
      } else {
        this.allNotifications = [];
        Swal.close();
      };
    });
  };

  openNotify(obj: any): void {
    /* if(obj.ativo === 1) {
      const id = obj.id;
      let newObj = obj;
      delete newObj.id;
      newObj.ativo = 0
      this.homeService.updateActive(newObj, this.ong, id).then(res => {
        //this.getNotification();
      });
    }; */
    const dialogRef = this.matDialog.open(InfoNotifyComponent, {
      data: {
        dataInfo: obj
      },
      height: '500px',
      width: '700px',
      panelClass: 'info-notify'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'excluir') {
        this.control = 0;
        this.getNotification();
        this.homeService.deleteEvent.next(true);
      } else {
        if(obj.ativo === 1) {
          const id = obj.id;
          let newObj = obj;
          delete newObj.id;
          newObj.ativo = 0;
          this.homeService.updateActive(newObj, this.ong, id).then(res=> {
            this.control = 0;
            this.getNotification();
          });
        }; 
      }
    });
  };

  openModal(obj: any): void {
    /* */
    const dialogRef = this.matDialog.open(ProcuraComponent, {
      data: {
        dataInfo: obj
      },
      height: '500px',
      width: '1050px',
      panelClass: 'info-notify'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'excluir') {
        this.control = 0;
        this.getNotification();
        this.homeService.deleteEvent.next(true);
      } else {
        if(obj.ativo === 1) {
          const id = obj.id;
          let newObj = obj;
          delete newObj.id;
          newObj.ativo = 0;
          this.homeService.updateActive(newObj, this.ong, id).then(res=> {
            this.control = 0;
            this.getNotification();
          });
        }; 
      }
    });
  };

}
