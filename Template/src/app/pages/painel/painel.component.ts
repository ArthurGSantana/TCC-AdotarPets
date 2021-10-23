import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { HomeService } from './../home/shared/home.service';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.scss']
})
export class PainelComponent implements OnInit {

  controlBorder: number = 1;
  allNotifications: any[] = [];
  user!: any;
  ong!: any;
  notify: any[] = [];
  notifyCount: number = 0;
  control: number = 0;

  constructor(
    private router: Router,
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.router.navigate(['painel/informacoes-gerais']);

    this.user = sessionStorage.getItem('login');
    this.ong = sessionStorage.getItem('ong');

    if(this.user) {
      this.getNotification();
    };

    this.homeService.deleteEvent.subscribe(res => {
      if(res) {
        setTimeout(() => {
          this.getNotification();
          this.control = 0;
        }, 100);
      };
    });
  }


  navega(params: string): any{
    switch(params) {
      case '1':
        this.controlBorder=1;
        this.router.navigate(['painel/informacoes-gerais']);
        break;
      case '2':
        this.controlBorder=2;
        this.router.navigate(['painel/editar']);
        break;
      case '3':
        this.controlBorder=3;
        this.router.navigate(['painel/avisos']);
        break;
    };
  };

  getNotification(): void {
    this.notify = [];
    this.homeService.getNotification(this.ong).subscribe(result => {
      if(result) {
        if(this.control === 0) {
          let objects = Object.entries(result);
          objects.forEach(array => {
            let newObj = array[1];
            newObj.id = array[0].toString();
            this.notify.push(newObj);
          });
          this.notifyCount = this.notify.length;
          this.control = 1;
        };
      } else {
        this.notifyCount = 0;
      };
    });
  };
}
