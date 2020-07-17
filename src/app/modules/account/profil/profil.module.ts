import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { ProfilRoutingModule } from './profil-routing.module';
import { UpdateComponent } from './update/update.component';


@NgModule({
  declarations: [UpdateComponent],
  imports: [
    CommonModule,
    ProfilRoutingModule,
    SharedModule
  ]
})
export class ProfilModule { }
