import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AvisosComponent } from './pages/painel/components/avisos/avisos.component';
import { LoginGuard } from './guards/loginGuard.service';
import { GerenciarComponent } from './pages/painel/components/gerenciar/gerenciar.component';
import { AdicionarPetComponent } from './pages/painel/components/adicionar-pet/adicionar-pet.component';
import { InformacoesGeraisComponent } from './pages/painel/components/informacoes-gerais/informacoes-gerais.component';
import { PainelComponent } from './pages/painel/painel.component';
import { DuvidasComponent } from './pages/duvidas/duvidas.component';
import { AchadosProcuradosComponent } from './pages/achados-procurados/achados-procurados.component';
import { QuemSomosComponent } from './pages/quem-somos/quem-somos.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { InformacoesComponent } from './pages/informacoes/informacoes.component';
import { AuthGuard } from './guards/authGuard.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  { path: 'quem-somos', component: QuemSomosComponent},
  { path: 'achados-perdidos/:info', component: AchadosProcuradosComponent },
  { path: 'informacoes', component: InformacoesComponent },
  { path: 'duvidas', component: DuvidasComponent },
  { path: 'painel', component: PainelComponent, children: [
    { path: 'informacoes-gerais', component: InformacoesGeraisComponent, canActivate: [AuthGuard] },
    { path: 'editar', component: AdicionarPetComponent, canActivate: [AuthGuard] },
    { path: 'avisos', component: AvisosComponent, canActivate: [AuthGuard] },
    { path: 'gerenciar', component: GerenciarComponent, canActivate: [AuthGuard] }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
