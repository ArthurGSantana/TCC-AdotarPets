import { StaticsService } from './../shared/statics.service';
import { Component, OnInit } from '@angular/core';
import { SidenavComponent } from './../sidenav/sidenav.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  openSide: boolean = false;

  constructor(
    private staticServ: StaticsService
  ) { }

  ngOnInit(): void {
  }

  ativaSidenav(): void{
    this.openSide ? this.openSide = false : this.openSide = true;
    this.staticServ.openSidenav.emit(this.openSide);
  };

}
