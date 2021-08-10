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
  contatos!: any[];
  item$!: Observable<any[]>;

  constructor(
    private painelService: PainelService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.painelService.showMessage(`Boas vindas ${this.ONG}! Seu painel está pronto!`);
    this.painelService.getAll().subscribe(res => {
      this.contatos = res;
    });

  }

  click() {
    console.log(this.contatos);

  }
}
