import { PetDialogComponent } from './../pet-dialog/pet-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PetsModel } from './../../shared/interfaces/Pets.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-pets',
  templateUrl: './display-pets.component.html',
  styleUrls: ['./display-pets.component.scss']
})
export class DisplayPetsComponent implements OnInit {

  @Input() petsAll: PetsModel[] = [];

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openDialog(pet: PetsModel): void {
    this.dialog.open(PetDialogComponent, {
      data: {
        pet: pet
      }
    });
  }

}
