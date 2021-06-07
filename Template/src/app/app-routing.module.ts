import { DuvidasComponent } from './pages/duvidas/duvidas.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AchadosProcuradosComponent } from './pages/achados-procurados/achados-procurados.component';
import { QuemSomosComponent } from './pages/quem-somos/quem-somos.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { InformacoesComponent } from './pages/informacoes/informacoes.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'quem-somos', component: QuemSomosComponent},
  { path: 'achados-perdidos/:info', component: AchadosProcuradosComponent },
  { path: 'informacoes', component: InformacoesComponent },
  { path: 'duvidas', component: DuvidasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
