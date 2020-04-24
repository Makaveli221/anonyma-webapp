import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { TopicRoutingModule } from './topic-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { CommentsModule } from '../comments/comments.module';


@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    TopicRoutingModule,
    SharedModule,
    CommentsModule
  ]
})
export class TopicModule { }
