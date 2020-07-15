import { Component, OnInit, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as M from 'materialize-css';
import { slideToTop } from 'app/layout/animations';
import { timer, combineLatest } from 'rxjs';

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
export class IndexComponent implements OnInit, AfterViewInit, OnDestroy {
  currentHistoire: Message;
  lastHistoires: Message[];
  timerSlider: any;

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
    this.messageService.getLastHistory().subscribe((res: any) => {
      this.lastHistoires = res as Message[];
    })
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      M.Carousel.init(document.querySelector('#carousel-pub'), {
        dist: 0,
        padding: 0,
        fullWidth: true,
        indicators: true,
        duration: 200,
      });
  
      this.autoplay();
    });
  }

  ngOnDestroy(): void {
    if (this.timerSlider) {
      this.timerSlider.unsubscribe();
    } 
  }

  updateSlider() {
    M.Carousel.getInstance(document.querySelector('#carousel-pub')).next();
    this.autoplay();
  }

  autoplay() {    
    this.timerSlider = combineLatest(timer(4500)).subscribe(() => this.updateSlider());
  }


  scrollToElement($element: HTMLElement): void {
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  updateCurrentHistoire(hist: Message) {
    this.currentHistoire = hist;
    this.router.navigate([`/forums/${hist.id}/details`]);
  }
}
