import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForumRoutingModule } from './forum-routing.module';
import { ListComponent } from './pages/list/list.component';
import { SingleComponent } from './pages/single/single.component';


@NgModule({
  declarations: [ListComponent, SingleComponent],
  imports: [
    CommonModule,
    ForumRoutingModule
  ]
})
export class ForumModule { }
