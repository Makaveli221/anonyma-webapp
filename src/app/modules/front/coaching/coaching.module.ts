import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoachingRoutingModule } from './coaching-routing.module';
import { ListComponent } from './pages/list/list.component';
import { SingleComponent } from './pages/single/single.component';


@NgModule({
  declarations: [ListComponent, SingleComponent],
  imports: [
    CommonModule,
    CoachingRoutingModule
  ]
})
export class CoachingModule { }
