import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-info-notify',
  templateUrl: './info-notify.component.html',
  styleUrls: ['./info-notify.component.scss']
})
export class InfoNotifyComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    console.log(this.data.dataInfo)
  }

  deleteNotify(): void {
    
  }

}
