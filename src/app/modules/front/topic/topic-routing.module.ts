import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/forums',
    pathMatch: 'full'
  },
  {
    path: ':id',
    component: IndexComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopicRoutingModule { }
