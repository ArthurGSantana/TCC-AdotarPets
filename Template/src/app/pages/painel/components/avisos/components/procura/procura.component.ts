import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-procura',
  templateUrl: './procura.component.html',
  styleUrls: ['./procura.component.scss']
})
export class ProcuraComponent implements OnInit {

  imageFiles: any;
  imageNow: any;
  controler: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.imageFiles = this.data.dataInfo.pet.files;
    this.imageNow = this.imageFiles[this.controler];
  }

  carrousel(type: string): void {
    if(this.imageFiles.length > 1) {
      if(type === 'left') {
        if(this.controler === 0) {
          this.controler = this.imageFiles.length - 1;
          this.imageNow = this.imageFiles[this.controler];
        } else {
          this.controler = this.controler - 1;
          this.imageNow = this.imageFiles[this.controler];
        }
      } else if(type === 'right') {
        if(this.controler === this.imageFiles.length - 1) {
          this.controler = 0;
          this.imageNow = this.imageFiles[this.controler];
        } else {
          this.controler = this.controler + 1;
          this.imageNow = this.imageFiles[this.controler];
        };
      };
    };
  };

  deleteNotify(): void {

  }
}
