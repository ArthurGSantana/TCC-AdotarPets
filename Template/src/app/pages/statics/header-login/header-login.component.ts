import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { LoginService } from './../../login/shared/login.service';
import { PainelService } from '../../painel/shared/painel.service';

@Component({
  selector: 'app-header-login',
  templateUrl: './header-login.component.html',
  styleUrls: ['./header-login.component.scss']
})
export class HeaderLoginComponent implements OnInit, AfterViewInit {

  ONG: string = 'ONG ainda não cadastrada';
  contas!: any[];
  item$!: Observable<any[]>;
  nameAccount: string = '';

  constructor(
    private loginService: LoginService,
    private painelService: PainelService
  ) { }

  ngOnInit(): void {
    this.loginService.loginEvent.subscribe(res => {
      this.nameAccount = res.login;
    });
  }

  ngAfterViewInit(): void {
    this.painelService.showMessage(`Boas vindas ${this.nameAccount}! Seu painel está pronto!`);
    this.loginService.getAllAccount().subscribe(res => {
      this.contas = res;
    });

  }

  click() {
    console.log(this.contas);

  }
}
