import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private firebase: AngularFireDatabase,
    private snack: MatSnackBar
  ) { }

  getAllAccount(): Observable<any[]> {
    return this.firebase.list('contas').valueChanges();
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
