import { AngularFireList } from '@angular/fire/database';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { PainelService } from './shared/painel.service';

@Component({
  selector: 'app-header-login',
  templateUrl: './header-login.component.html',
  styleUrls: ['./header-login.component.scss']
})
export class HeaderLoginComponent implements OnInit, AfterViewInit {

  ONG: string = 'ONG ainda não cadastrada';
  contatos!: AngularFireList<any>;

  constructor(
    private painelService: PainelService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.painelService.showMessage(`Boas vindas ${this.ONG}! Seu painel está pronto!`);
    this.contatos = this.painelService.getAll();

  }

  click() {
    console.log(this.contatos);

  }
}
