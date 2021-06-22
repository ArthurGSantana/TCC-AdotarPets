import { PainelService } from './shared/painel.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-login',
  templateUrl: './header-login.component.html',
  styleUrls: ['./header-login.component.scss']
})
export class HeaderLoginComponent implements OnInit, AfterViewInit {

  ONG: string = 'ONG ainda não cadastrada';

  constructor(
    private painelService: PainelService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.painelService.showMessage(`Boas vindas ${this.ONG}! Seu painel está pronto!`)
  }
}
