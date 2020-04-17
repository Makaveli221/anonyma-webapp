import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';


import { UserRoutingModule } from './user-routing.module';
import { MyTopicsComponent } from './pages/my-topics/my-topics.component';
import { NewTopicComponent } from './pages/new-topic/new-topic.component';


@NgModule({
  declarations: [MyTopicsComponent, NewTopicComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
