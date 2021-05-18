import { StaticsService } from './../shared/statics.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  ativaSidenav: boolean = false;

  constructor(
    private staticServ: StaticsService
  ) { }

  ngOnInit(): void {
    this.staticServ.openSidenav.subscribe(res => {
      res === true ? this.ativaSidenav = true : this.ativaSidenav = true;
    });
  }

}
