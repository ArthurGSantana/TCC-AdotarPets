import { Router } from '@angular/router';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { LoginService } from './../../login/shared/login.service';
import { PainelService } from '../../painel/shared/painel.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header-login',
  templateUrl: './header-login.component.html',
  styleUrls: ['./header-login.component.scss']
})
export class HeaderLoginComponent implements OnInit, AfterViewInit {

  ONG: string = 'ONG ainda não cadastrada';
  contas!: any[];
  item$!: Observable<any[]>;
  nameAccount: any = '';

  constructor(
    private loginService: LoginService,
    private painelService: PainelService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.nameAccount = sessionStorage.getItem('login');
  }

  ngAfterViewInit(): void {
    this.painelService.showMessage(`Boas vindas ${this.nameAccount}! Seu painel está pronto!`);
    this.loginService.getAllAccount().subscribe(res => {
      this.contas = res;
    });
  }

  removeUser(): void {
    Swal.fire({
      title: 'Saindo da conta...',
      allowOutsideClick: false,
      didOpen: () => { Swal.showLoading() },
    });
    sessionStorage.clear();
    this.router.navigate(['/home']);
  };

}
