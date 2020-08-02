import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { pulse } from 'ng-animate';
import * as M from 'materialize-css';
import { Message } from '@schema/message';
import { MessageService } from '@service/forum/message.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'],
  animations: [
    trigger('pulse', [transition('* => *', useAnimation(pulse))]),
 ]
})
export class ChatbotComponent implements OnInit, AfterViewInit {
  @ViewChild('content', {static: false}) content: ElementRef;
  @ViewChildren('item') itemElements: QueryList<any>;
  private scrollContainer: any;
  pulse: any;
  canChat: boolean;
  chatStep: number;
  messages = []; //array that hold the record of each string in chat
  lastUserMessage = ""; //keeps track of the most recent input string from the user
  botMessage = ""; //var keeps track of what the chatbot is going to say
  botName = 'Chatbot'; //name of the chatbot
  message: Message;
  

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.canChat = false;
    this.message = {
      type: 'chatbox',
      email: '',
      texte: ''
    };
  }

  ngAfterViewInit(): void {
    M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'), {});
    M.Tooltip.init(document.querySelectorAll('.tooltipped'), {});
  }

  initChat() {
    if(this.messages.length > 0) {
      return;
    }
    this.chatStep = 1;
    this.typingLoader(true);
    setTimeout(() => {
      this.botMessage = 'Bonjour, bienvenue sur Anonym@. Je suis votre coach et je suis là pour vous écouter.';
      this.typingLoader(false);
      this.messages.push({type: 'anonyma', text: this.botMessage});
    }, 500);
    this.typingLoader(true);
    setTimeout(() => {
      this.botMessage = 'D\'abord laissez nous une adresse email pour vous contacter si nécessaire.';
      this.typingLoader(false);
      this.messages.push({type: 'anonyma', text: this.botMessage});
    }, 900);
  }

  activeChat() {
    this.canChat = !this.canChat;
    if (this.canChat) {
      setTimeout(() => {
        (document.getElementById("chatbox") as HTMLInputElement).focus();
        this.scrollContainer = this.content.nativeElement;  
        this.itemElements.changes.subscribe(_ => this.onItemElementsChanged());
        this.initChat();
      });
    }
  }

  onKeyPress(e: any) {
    const x = e || window.event;
    const key = (x.keyCode || x.which);
    const chatInput = document.getElementById("chatbox") as HTMLInputElement;
    if (key == 13 || key == 3) {
      //runs this function when enter is pressed
      this.newEntry();
    }
    if (chatInput.value !== "") {
      chatInput.setAttribute('good', '');
    } else {
      chatInput.removeAttribute('good');
    }
  }

  chatbotResponse() {
    this.botMessage = "Je suis confuse"; //the default message
    const hi = ['hi','howdy','hello', 'bonjour', 'salut'];
    const bye = ['bye','au revoir','ciao', 'à la prochaine'];
    const appreciation = ['merci','thanks','thank you', 'd\'accord', 'ok', 'c\'est bon'];

    switch (this.chatStep) {
      case 1:
        if (this.validateEmail(this.lastUserMessage)) {
          this.message.email = this.lastUserMessage;
          this.chatStep++;
          this.botMessage = "Merci, c'est noté. <br> Maintenant vous pouvez nous raconter votre histoire.";
        } else {
          this.botMessage = "Cette adresse email est incorrecte. Veuillez taper une adresse email correcte";
        }
        break;
      
      case 2:
        this.message.texte = this.lastUserMessage;
        this.chatStep++;
        this.botMessage = "Nous avons bien reçu votre message. Nous vous répondrons au plus vite. Merci de votre patience.";
        break;
    
      default:
        break;
    }
  
    if (hi.indexOf(this.lastUserMessage.toLowerCase()) !== -1) {
      this.botMessage = hi[Math.floor(Math.random()*(hi.length))];
    }

    if (bye.indexOf(this.lastUserMessage.toLowerCase()) !== -1) {
      this.botMessage = bye[Math.floor(Math.random()*(hi.length))];
    }

    if (appreciation.indexOf(this.lastUserMessage.toLowerCase()) !== -1) {
      this.botMessage = 'Je vous en prie';
    }
  }

  newEntry() {
    const chatInput = document.getElementById("chatbox") as HTMLInputElement;

    if (chatInput.value != "") {
      this.lastUserMessage = chatInput.value;
      chatInput.value = "";
      this.messages.push({type: 'user', text: this.lastUserMessage});
      this.typingLoader(true);
      this.chatbotResponse();
      setTimeout(() => {
        this.typingLoader(false);
        this.messages.push({type: 'anonyma', text: this.botMessage});
        if(this.chatStep === 3) {
          this.chatStep++;
          this.messageService.create(this.message).subscribe((res: any) => {
            console.log('Success');
          })
        }
      }, 2000);
    }
  }

  typingLoader(active: boolean) {
    const loader    = document.getElementById('typing-loader') as HTMLElement;
    if (active) {
      loader.classList.remove('hidden');
    } else {
      loader.classList.add('hidden');
    }
  }

  private onItemElementsChanged(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    this.scrollContainer.scroll({
      top: this.scrollContainer.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }

  validateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  }

}
