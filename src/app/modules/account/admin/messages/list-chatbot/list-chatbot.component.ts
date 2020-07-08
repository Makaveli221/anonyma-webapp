import { Component, OnInit } from '@angular/core';
import { slideToTop } from 'app/layout/animations';
import { MessageService } from '@service/forum/message.service';
import { Message } from '@schema/message';

@Component({
  selector: 'app-list-chatbot',
  templateUrl: './list-chatbot.component.html',
  styleUrls: ['./list-chatbot.component.scss'],
  animations: [
    slideToTop
 ]
})
export class ListChatbotComponent implements OnInit {
  chatbots: Message[];

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.chatbots = [];
    this.messageService.allChatbot().subscribe((res: any) => {
      this.chatbots = res as Message[];
    });
  }

}
