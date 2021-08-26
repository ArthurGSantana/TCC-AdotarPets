import { Account } from './../../../shared/interfaces/account.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginEvent: BehaviorSubject<string> = new BehaviorSubject<string>('');

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
}
