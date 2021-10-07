import { InfoNotifyComponent } from './components/info-notify/info-notify.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from './../../../login/shared/login.service';
import { HomeService } from './../../../home/shared/home.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-avisos',
  templateUrl: './avisos.component.html',
  styleUrls: ['./avisos.component.scss']

})
export class AvisosComponent implements OnInit {

  allNotifications: any[] = [];
  notify: any[] = [];
  user!: any;
  ong!: any;

  constructor(
    private homeService: HomeService,
    private loginService: LoginService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    
    this.user = sessionStorage.getItem('login');
    this.ong = sessionStorage.getItem('ong');

    console.log(this.user, this.ong)
    if(this.user) {
      this.getNotification();
    };
  }

  getNotification(): void {
    this.homeService.getNotification(this.ong).subscribe(result => {
      console.log(result)
      result.forEach(item => {
        this.allNotifications.push(item);
        /* let objParse = Object.values(item);
        objParse.forEach(x => {
          this.allNotifications.push(x);
        }) */
      });
      this.allNotifications.forEach(item => {
        this.notify.push(JSON.parse(item));
      });
    });
  }

  openNotify(obj: any): void {
    this.matDialog.open(InfoNotifyComponent, {
      data: {
        dataInfo: obj
      },
      height: '500px',
      width: '700px',
      panelClass: 'info-notify'
    });
  }

}
