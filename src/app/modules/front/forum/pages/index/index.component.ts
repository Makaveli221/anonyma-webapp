import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { slideToTop } from 'app/layout/animations';

import { Message } from '@schema/message';
import { MessageService } from '@service/forum/message.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: [
    slideToTop
  ]
})
export class IndexComponent implements OnInit {
  currentHistoire: Message;
  lastHistoires: Message[];

  constructor(private route: ActivatedRoute, private router: Router, private elementRef: ElementRef, private messageService: MessageService) { }

  ngOnInit(): void {
    this.lastHistoires = [];
    this.messageService.get(this.route.snapshot.paramMap.get('id')).subscribe((response: any) => {
      if(!response || !response.id) {
        this.router.navigate([`/forums/list`]);
        return false;
      }
      this.currentHistoire = response as Message;
    });
  }

  scrollToElement($element: HTMLElement): void {
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  updateCurrentHistoire(hist: Message) {
    this.currentHistoire = hist;
    this.router.navigate([`/forums/${hist.id}/details`]);
  }
}
