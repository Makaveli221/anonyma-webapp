import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyTopicsComponent } from './pages/my-topics/my-topics.component';
import { NewTopicComponent } from './pages/new-topic/new-topic.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/account/user/my-topics',
    pathMatch: 'full'
  },
  {
    path: 'my-topics',
    component: MyTopicsComponent
  },
  {
    path: 'my-topics/new',
    component: NewTopicComponent
  },
  {
    path: 'my-topics/update/:id',
    component: NewTopicComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
