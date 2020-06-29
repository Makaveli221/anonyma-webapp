import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { ResultComponent } from './pages/result/result.component';
import { SharedModule } from '@shared/shared.module';
import { FormSearchComponent } from './pages/form-search/form-search.component';


@NgModule({
  declarations: [ResultComponent, FormSearchComponent,],
  imports: [
    CommonModule,
    SearchRoutingModule,
    SharedModule
  ],
  exports: [
    FormSearchComponent
  ]
})
export class SearchModule { }
