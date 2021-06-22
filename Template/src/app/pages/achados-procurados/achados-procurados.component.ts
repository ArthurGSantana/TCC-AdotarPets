import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { MatDialog } from '@angular/material/dialog';

import { DialogInfoComponent } from './../../shared/dialog-info/dialog-info.component';
import { HomeService } from './../home/shared/home.service';

@Component({
  selector: 'app-achados-procurados',
  templateUrl: './achados-procurados.component.html',
  styleUrls: ['./achados-procurados.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class AchadosProcuradosComponent implements OnInit, OnDestroy {

  info: string = '';
  title: string = '';
  especies: string[] = [""];
  tamanhos: string[] = [""];

  petForm!: FormGroup;
  clientForm!: FormGroup;

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private homeServ: HomeService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.info = this.router.snapshot.params.info
    this.verifica();
    this.route.events.subscribe(() => {
      this.info = this.router.snapshot.params.info
      this.verifica();
    });

    this.especies = this.homeServ.especies;
    this.tamanhos = this.homeServ.portes;

    this.petForm = this.formBuilder.group({
      especie: ['', Validators.required],
      tamanho: ['', Validators.required],
      nome: [''],
      cidade: ['', Validators.required],
      infos: ['', Validators.required]
    });

    this.clientForm = this.formBuilder.group({
      nome: ['', Validators.required],
      cidade: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnDestroy(): void {

  }

  verifica(): void{
    this.info === 'perdido' ? this.title = 'Perdeu seu Pet?' : this.title = 'Achou algum Pet?'
  };

  openDialog(): void{
    this.dialog.open(DialogInfoComponent);
  }

}
