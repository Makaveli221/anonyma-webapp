import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { ForumRoutingModule } from './forum-routing.module';
import { ListComponent } from './pages/list/list.component';
import { IndexComponent } from './pages/index/index.component';

import { CommentsModule } from '../comments/comments.module';


@NgModule({
  declarations: [ListComponent, IndexComponent],
  imports: [
    CommonModule,
    ForumRoutingModule,
    SharedModule,
    CommentsModule
  ]
})
export class ForumModule { }
