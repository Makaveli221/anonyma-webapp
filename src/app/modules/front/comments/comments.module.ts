import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './comments.component';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [CommentsComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [CommentsComponent]
})
export class CommentsModule { }
