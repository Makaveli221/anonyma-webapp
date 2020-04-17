import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ControlMessagesComponent } from './component/control-messages/control-messages.component';
import { FormTopicComponent } from './component/form-topic/form-topic.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  declarations: [ControlMessagesComponent, FormTopicComponent],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ControlMessagesComponent,
    FormTopicComponent
  ]
})
export class SharedModule { }
