import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { ForumRoutingModule } from './forum-routing.module';
import { ListComponent } from './pages/list/list.component';


@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    ForumRoutingModule,
    SharedModule
  ]
})
export class ForumModule { }
