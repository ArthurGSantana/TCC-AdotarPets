import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, AfterViewInit } from '@angular/core';

import { Account } from './../../shared/interfaces/account.model';
import { LoginService } from './shared/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  loginForm!: FormGroup;

  contas!: Account[];

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.minLength(5)]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngAfterViewInit(): void {
    this.loginService.getAllAccount().subscribe(dados => {
      this.contas = dados;
    });
  }

  onSubmit(): void {
    this.contas.forEach(item => {
      if (item.login === this.loginForm.value.login){
        if (item.senha === this.loginForm.value.senha){
          sessionStorage.setItem('login', item.login);
          sessionStorage.setItem('ong', item.ong);
          this.loginService.loginEvent.next(item);
          this.router.navigate(['painel/informacoes-gerais']);
        } else {
          this.loginService.showMessage('Senha incorreta, tente novamente!');
        };
      } else {
        this.loginService.showMessage('Login incorreto, tente novamente!');
      };
    });
  };

}
