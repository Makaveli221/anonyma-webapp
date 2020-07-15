import { Component, OnInit, AfterViewInit, HostListener, ElementRef, OnDestroy } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { jackInTheBox, fadeInRight, pulse } from 'ng-animate';
import { timer, combineLatest } from 'rxjs';

import * as M from 'materialize-css';
import { SubjectService } from '@service/forum/subject.service';
import { TopicService } from '@service/forum/topic.service';
import { Subject } from '@schema/subject';
import { TypeSubject } from '@schema/type-subject';
import { Topic } from '@schema/topic';
import { Comment } from '@schema/comment';
import { Message } from '@schema/message';
import { TeaserService } from '@service/forum/teaser.service';
import { Teaser } from '@schema/teaser';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
  animations: [
    trigger('bounce', [transition('* => *', useAnimation(jackInTheBox))]),
    trigger('fadeInRight', [transition('* => *', useAnimation(fadeInRight))]),
    trigger('pulse', [transition('* => *', useAnimation(pulse))])
 ]
})
export class AccueilComponent implements OnInit, AfterViewInit, OnDestroy {
  bounce: any;
  fadeInRight: any;
  pulse: any;
  lastComments: Comment[] = [];
  teasers: Teaser[];
  configCarousel = {
    dist: 0,
    padding: 0,
    fullWidth: true,
    indicators: true,
    duration: 200
  }
  state = {
    pub: 'hide'
  }
  timerSlider: any;

  constructor(public el: ElementRef, private teaserService: TeaserService, private topicService: TopicService) { }

  ngOnInit(): void {
    this.teasers = [];
    this.teaserService.all().subscribe((res: any) => {
      console.log(res);
      this.teasers = res as Teaser[];
    });
    this.topicService.getLastComments().subscribe((response: any) => {
      if(response && response.length > 0) {
        this.lastComments = response as Comment[];
      }
    });
  }

  ngAfterViewInit(): void {

    M.Carousel.init(document.querySelector('#carousel-intro'), this.configCarousel);

    M.Carousel.init(document.querySelector('#carousel-pub'), this.configCarousel);

    this.autoplay();
  }

  ngOnDestroy(): void {
    if (this.timerSlider) {
      this.timerSlider.unsubscribe();
    } 
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const elePubPosition = this.el.nativeElement.querySelector('#rightContent');
    const scrollPosition = window.pageYOffset;

    if (elePubPosition && (scrollPosition >= elePubPosition.offsetTop + 10)) {
      this.state.pub = 'show';
    }
  }

  updateSlider() {
    M.Carousel.getInstance(document.querySelector('#carousel-intro')).next();
    M.Carousel.getInstance(document.querySelector('#carousel-pub')).next();
    this.autoplay();
  }

  autoplay() {    
    this.timerSlider = combineLatest(timer(4500)).subscribe(() => this.updateSlider());
  }

  getRoute(type: string, source: any) {
    let urlPage = '';
    switch (type) {
      case 'topic':
        const typeSub = (source.subject as Subject).typeSubject as TypeSubject;
        if(typeSub.name === 'forums') {
          urlPage = `/forums/thematique/${source.key}`;
        }
        if(typeSub.name === 'religions') {
          urlPage = `/religions/thematique/${source.key}`;
        }
        if(typeSub.name === 'astuces') {
          urlPage = `/astuces/thematique/${source.key}`;
        }
        break;
    
      case 'histoire':
        urlPage = `/forums/${source.id}/details`;
        break;
      default:
        break;
    }
    return urlPage;
  }
}
