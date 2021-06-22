import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class PainelService {

constructor(
  private snack: MatSnackBar
) { }

  showMessage(msg: string): void{
    this.snack.open(msg, 'X', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'snack'
    })
  }

}
