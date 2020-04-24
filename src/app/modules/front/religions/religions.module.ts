import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReligionsRoutingModule } from './religions-routing.module';
import { ListComponent } from './pages/list/list.component';
import { SingleComponent } from './pages/single/single.component';


@NgModule({
  declarations: [ListComponent, SingleComponent],
  imports: [
    CommonModule,
    ReligionsRoutingModule
  ]
})
export class ReligionsModule { }
