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
  controlFade: boolean = false;
  controlFadeDown: boolean = false;

  constructor(
    private staticServ: StaticsService
  ) { }

  ngOnInit(): void {
  }

  ativaSidenav(): void{
    this.controlFadeDown = !this.controlFadeDown
    this.openSide === true ? this.controlFade = true : this.controlFade = false;
    if(this.controlFadeDown) {
      this.openSide = !this.openSide;
    } else {
      setTimeout(() => {
        this.openSide = !this.openSide;
      }, 300);
    }
  };

}
