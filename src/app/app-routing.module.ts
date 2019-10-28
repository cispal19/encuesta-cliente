import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoginComponent} from './pages/login/login.component';
import { GuardService } from './_services/guard.service';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  {path: 'login', component:LoginComponent, canActivate: [GuardService]},
  {path: 'main', component:MainComponent},
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
