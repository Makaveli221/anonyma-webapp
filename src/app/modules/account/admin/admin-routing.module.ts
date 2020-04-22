import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListForumComponent } from './forum/list-forum/list-forum.component';
import { NewForumComponent } from './forum/new-forum/new-forum.component';
import { ListTopicComponent } from './topic/list-topic/list-topic.component';
import { NewTopicComponent } from './topic/new-topic/new-topic.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListReligionComponent } from './religions/list-religion/list-religion.component';
import { NewReligionComponent } from './religions/new-religion/new-religion.component';
import { ListAstuceComponent } from './astuces/list-astuce/list-astuce.component';
import { NewAstuceComponent } from './astuces/new-astuce/new-astuce.component';
import { ListUserComponent } from './users/list-user/list-user.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/account/admin/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'forums',
    component: ListForumComponent
  },
  {
    path: 'forums/:key/topics',
    component: ListTopicComponent
  },
  {
    path: 'forums/:key/topics/new',
    component: NewTopicComponent
  },
  {
    path: 'forums/:key/topics/update/:id',
    component: NewTopicComponent
  },
  {
    path: 'religions',
    component: ListReligionComponent
  },
  {
    path: 'religions/:key/topics',
    component: ListTopicComponent
  },
  {
    path: 'religions/:key/topics/new',
    component: NewTopicComponent
  },
  {
    path: 'religions/:key/topics/update/:id',
    component: NewTopicComponent
  },
  {
    path: 'astuces',
    component: ListAstuceComponent
  },
  {
    path: 'astuces/:key/topics',
    component: ListTopicComponent
  },
  {
    path: 'astuces/:key/topics/new',
    component: NewTopicComponent
  },
  {
    path: 'astuces/:key/topics/update/:id',
    component: NewTopicComponent
  },
  {
    path: 'users',
    component: ListUserComponent
  }
];

// religions-et-astuces
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
