import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { AdminRoutingModule } from './admin-routing.module';
import { ListForumComponent } from './forum/list-forum/list-forum.component';
import { NewForumComponent } from './forum/new-forum/new-forum.component';
import { NewTopicComponent } from './topic/new-topic/new-topic.component';
import { ListTopicComponent } from './topic/list-topic/list-topic.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListReligionComponent } from './religions/list-religion/list-religion.component';
import { NewReligionComponent } from './religions/new-religion/new-religion.component';
import { ListAstuceComponent } from './astuces/list-astuce/list-astuce.component';
import { NewAstuceComponent } from './astuces/new-astuce/new-astuce.component';
import { ListUserComponent } from './users/list-user/list-user.component';


@NgModule({
  declarations: [ListForumComponent, NewForumComponent, NewTopicComponent, ListTopicComponent, DashboardComponent, ListReligionComponent, NewReligionComponent, ListAstuceComponent, NewAstuceComponent, ListUserComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
