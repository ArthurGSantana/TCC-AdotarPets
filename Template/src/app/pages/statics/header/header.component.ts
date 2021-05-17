import { HomeComponent } from './../../home/home.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private homeComp: HomeComponent
  ) { }

  ngOnInit(): void {
  }

  ativaSidenav(): void{
    this.homeComp.recebeSidenav();
  }

}
