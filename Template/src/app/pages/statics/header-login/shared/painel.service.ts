import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PainelService {



constructor(
  private snack: MatSnackBar,
  private firebase: AngularFireDatabase,
  private firestore: AngularFirestore
) { }

  showMessage(msg: string): void{
    this.snack.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'snack'
    })
  };

  getAll(): Observable<any[]> {
    return this.firebase.list('animais').valueChanges();
  };

}
