import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MesSujetsComponent } from './pages/mes-sujets/mes-sujets.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/account/user/mes-sujets',
    pathMatch: 'full'
  },
  {
    path: 'mes-sujets',
    component: MesSujetsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
