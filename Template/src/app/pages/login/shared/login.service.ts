import { Account } from './../../../shared/interfaces/account.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginEvent: BehaviorSubject<Account> = new BehaviorSubject<Account>({login: '', senha: '', ong: ''});

  constructor(
    private firebase: AngularFireDatabase,
    private snack: MatSnackBar
  ) { }

  getAllAccount(): Observable<Account[]> {
    return this.firebase.list<Account>('contas').valueChanges();
  };

  showMessage(msg: string): void{
    this.snack.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'snack'
    })
  };

  isAuthenticate(): boolean {
    let authenticate: boolean = false;
    let user = sessionStorage.getItem('login');
    if(user) authenticate = true;
    return authenticate;
  };
}
