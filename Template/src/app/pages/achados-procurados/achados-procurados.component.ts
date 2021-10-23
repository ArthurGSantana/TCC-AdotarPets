import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { MatDialog } from '@angular/material/dialog';

import { DialogInfoComponent } from './../../shared/dialog-info/dialog-info.component';
import { HomeService } from './../home/shared/home.service';
import Swal from 'sweetalert2';
import { isNgTemplate } from '@angular/compiler';

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
  file!: any;
  preview!: string;
  imagesImport: any[] = [];
  users: any[] = [];

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
      infos: ['', Validators.required],
      files: ['']
    });

    this.clientForm = this.formBuilder.group({
      nome: ['', Validators.required],
      cidade: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.homeServ.getUsers().subscribe(res => {
      this.users = res;
    })
  }

  ngOnDestroy(): void {

  }

  verifica(): void{
    this.info === 'perdido' ? this.title = 'Perdeu seu Pet?' : this.title = 'Achou algum Pet?'
  };

  openDialog(): void{
    this.dialog.open(DialogInfoComponent);
  }

  getFileImage(event: any): void {
    let imgfile = event.target.files[0] as File;
    this.file = imgfile as File;
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.preview = event.target.result;
      let objImage = {
        fileName: imgfile.name,
        type: imgfile.type,
        fileContent: this.preview
      };
      this.imagesImport.push(objImage)
    };
    reader.readAsDataURL(imgfile);
  };

  visibility(image: any): void {
    let newImage = new Image();
    newImage.src = image.fileContent;

    let w: any = window.open("");
        w.document.write(newImage.outerHTML);
  };

  onSubmit(): void {
    this.petForm.get('files')?.setValue(this.imagesImport);
    let sendForm = {
      pet: this.petForm.value,
      user: this.clientForm.value,
      type: this.info,
      ativo: 1
    };
    
    this.users.forEach((item, index, array)=> {
      this.homeServ.createNotification(sendForm, item);
    });

    setTimeout(() => {
      Swal.fire({
        icon: 'success',
        title: 'As informações foram enviadas com sucesso!',
        showConfirmButton: false,
        timer: 1700
      }).then(result => {
        this.petForm.reset();
        this.clientForm.reset();
        this.imagesImport = [];
      });
    }, 100);
  };

  deleteImage(image: any): void {
    this.imagesImport = this.imagesImport.filter(item => item.fileName !== image.fileName);
    this.file = '';
    this.preview = '';
  };

}
