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

  constructor(
    private homeService: HomeService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    
    this.loginService.loginEvent.subscribe(res => {
      this.homeService.getNotification(res.ong).subscribe(result => {
        result.forEach(item => {
          let objParse = Object.values(item);
          objParse.forEach(x => {
            this.allNotifications.push(JSON.parse(x as any));
          })
          console.log(this.allNotifications)
        });
      });
    });

  }

}
