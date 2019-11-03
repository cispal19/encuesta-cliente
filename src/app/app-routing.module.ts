import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoginComponent} from './pages/login/login.component';
import { GuardService } from './_services/guard.service';
import { MainComponent } from './pages/main/main.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { AboutComponent } from './pages/about/about.component';
import { EncuestaComponent } from './pages/encuesta/encuesta.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [GuardService]},
  {path: 'logout', component: LogoutComponent},
  {path: 'main', component: MainComponent, children: [
    {path: 'encuesta', component: EncuestaComponent}
  ]},
  {path: 'about', component: AboutComponent},
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
