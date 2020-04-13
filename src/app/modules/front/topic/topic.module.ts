import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { TopicRoutingModule } from './topic-routing.module';
import { IndexComponent } from './pages/index/index.component';


@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    TopicRoutingModule,
    SharedModule
  ]
})
export class TopicModule { }
