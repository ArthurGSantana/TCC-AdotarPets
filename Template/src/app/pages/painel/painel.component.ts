import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.scss']
})
export class PainelComponent implements OnInit {

  controlBorder: number = 1;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.navigate(['painel/informacoes-gerais']);
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
    }
  }
}
