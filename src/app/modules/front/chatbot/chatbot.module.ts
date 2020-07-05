import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { ChatbotComponent } from './chatbot.component';



@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [ChatbotComponent],
  exports: [ChatbotComponent]
})
export class ChatbotModule { }
