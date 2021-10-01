import { InfoNotifyComponent } from './components/info-notify/info-notify.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from './../../../login/shared/login.service';
import { HomeService } from './../../../home/shared/home.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-avisos',
  templateUrl: './avisos.component.html',
  styleUrls: ['./avisos.component.scss']
})
export class AvisosComponent implements OnInit {

  allNotifications: any[] = [];
  notify: any[] = [];

  constructor(
    private homeService: HomeService,
    private loginService: LoginService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    
    this.loginService.loginEvent.subscribe(res => {
      this.homeService.getNotification(res.ong).subscribe(result => {
        console.log(result)
        result.forEach(item => {
          let objParse = Object.values(item);
          objParse.forEach(x => {
            this.allNotifications.push(x);
          })
          
        });
        this.allNotifications.forEach(item => {
          this.notify.push(JSON.parse(item));
        });
      });
    });
  }

  openNotify(obj: any): void {
    this.matDialog.open(InfoNotifyComponent, {
      data: {
        dataInfo: obj
      },
      height: '600px'
    });
  }

}
