import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { MesSujetsComponent } from './pages/mes-sujets/mes-sujets.component';


@NgModule({
  declarations: [MesSujetsComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
