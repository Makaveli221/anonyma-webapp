import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css';
import { slideToTop } from 'app/layout/animations';
import { MessageService } from '@service/forum/message.service';
import { Message } from '@schema/message';
import { CurrentUserService } from '@service/current-user.service';
import { ActivatedRoute } from '@angular/router';

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
  pager: any = {};
  initialPage: number;

  constructor(private route: ActivatedRoute, private messageService: MessageService, public currentUser: CurrentUserService) { }

  ngOnInit(): void {
    this.chatbots = [];
    this.initialPage = 1;
    this.route.queryParams.subscribe(x => this.loadPage(x.page || this.initialPage));
  }

  loadPage(page: number) {
    this.messageService.allChatbot(page).subscribe((res: any) => {
      if (res && !res.empty) {
        const pages = [...Array(res.totalPages + 1).keys()];
        pages.shift();

        this.chatbots = res.content as Message[];
        this.pager.current = res.number + 1;
        this.pager.first = res.first;
        this.pager.last = res.last;
        this.pager.pages = pages;
      }
    });
  }

  deleteTchat(id) {
    if(confirm("Etes-vous de vouloir supprimer ce chatbot ?")) {
      this.messageService.delete(id).subscribe((res: any) => {
        document.querySelector(`#tchat-${id}`).remove();
        let message = 'Tchat supprimé avec succès!';
        var toastHTML = '<span>'+ message +'</span><button class="btn-flat toast-action" onclick="M.toast.dismiss();">Fermer</button>';
        M.toast({html: toastHTML});
      });
    }
  }

}
