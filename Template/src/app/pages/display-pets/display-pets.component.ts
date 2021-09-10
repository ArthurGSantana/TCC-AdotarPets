import { PetsModel } from './../../shared/interfaces/Pets.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-pets',
  templateUrl: './display-pets.component.html',
  styleUrls: ['./display-pets.component.scss']
})
export class DisplayPetsComponent implements OnInit {

  @Input() petsAll: PetsModel[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
