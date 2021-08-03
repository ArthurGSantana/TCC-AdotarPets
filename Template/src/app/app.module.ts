import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list'
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/statics/header/header.component';
import { SidenavComponent } from './pages/statics/sidenav/sidenav.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { QuemSomosComponent } from './pages/quem-somos/quem-somos.component';
import { AchadosProcuradosComponent } from './pages/achados-procurados/achados-procurados.component';
import { InformacoesComponent } from './pages/informacoes/informacoes.component';
import { DuvidasComponent } from './pages/duvidas/duvidas.component';
import { DialogInfoComponent } from './shared/dialog-info/dialog-info.component';
import { PainelComponent } from './pages/painel/painel.component';
import { HeaderLoginComponent } from './pages/statics/header-login/header-login.component';
import { InformacoesGeraisComponent } from './pages/painel/components/informacoes-gerais/informacoes-gerais.component';
import { AdicionarPetComponent } from './pages/painel/components/adicionar-pet/adicionar-pet.component';
import { AvisosComponent } from './pages/painel/components/avisos/avisos.component';

//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    HomeComponent,
    LoginComponent,
    QuemSomosComponent,
    AchadosProcuradosComponent,
    InformacoesComponent,
    DuvidasComponent,
    DialogInfoComponent,
    PainelComponent,
    HeaderLoginComponent,
    InformacoesGeraisComponent,
    AdicionarPetComponent,
    AvisosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FontAwesomeModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatSelectModule,
    FormsModule,
    MatSidenavModule,
    MatListModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatGridListModule,
    MatDialogModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
