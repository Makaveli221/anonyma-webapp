import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { ControlMessagesComponent } from './component/control-messages/control-messages.component';
import { FormTopicComponent } from './component/form-topic/form-topic.component';
import { FormSubjectComponent } from './component/form-subject/form-subject.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CKEditorModule
  ],
  declarations: [ControlMessagesComponent, FormTopicComponent, FormSubjectComponent],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ControlMessagesComponent,
    FormTopicComponent,
    FormSubjectComponent
  ]
})
export class SharedModule { }
