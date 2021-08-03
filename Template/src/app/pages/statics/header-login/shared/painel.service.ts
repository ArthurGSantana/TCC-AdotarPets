import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class PainelService {

constructor(
  private snack: MatSnackBar,
  private firebase: AngularFireDatabase
) { }

  showMessage(msg: string): void{
    this.snack.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'snack'
    })
  };

  getAll(): AngularFireList<any> {
    return this.firebase.list('contatos');
  };

}
