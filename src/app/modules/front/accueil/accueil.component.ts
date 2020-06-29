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
  forums: Subject[] = [];
  subjectTopics: {subjectA: Topic[], subjectB: Topic[], subjectC: Topic[]};
  lastComments: Comment[] = [];
  titleA: string = '';
  titleB: string = '';
  titleC: string = '';
  state = {
    pub: 'hide'
  }
  timerSlider: any;

  constructor(public el: ElementRef, private subjectService: SubjectService, private topicService: TopicService) { }

  ngOnInit(): void {
    this.subjectTopics = {subjectA: [], subjectB: [], subjectC: []};
    this.subjectService.getAllByType('forums', 1, 3).subscribe(
      (response: any) => {
        if(response && response.content && response.content.length > 0) {
          this.forums = response.content as Subject[];
          this.setListTopics(this.forums[0].key, 'subjectA');
          this.titleA = this.forums[0].title;
          if(this.forums[1]) {
            this.setListTopics(this.forums[1].key, 'subjectB');
            this.titleB = this.forums[1].title;
          }
          if(this.forums[2]) {
            this.setListTopics(this.forums[2].key, 'subjectC');
            this.titleC = this.forums[2].title;
          }
        }
      }
    );
    this.topicService.getLastComments().subscribe((response: any) => {
      if(response && response.length > 0) {
        this.lastComments = response as Comment[];
      }
    });
  }

  ngAfterViewInit(): void {
    M.Tabs.init(document.querySelectorAll('.tabs'), {});

    M.Collapsible.init(document.querySelectorAll('.collapsible'), {});

    M.Carousel.init(document.querySelectorAll('.carousel'), {
      dist: 0,
      padding: 0,
      fullWidth: true,
      indicators: true,
      duration: 200,
    });


    (document.querySelector('.tabs .indicator') as HTMLElement).style.backgroundColor = '#ffffff';
    (document.querySelector('.tabs .indicator') as HTMLElement).style.height = '5px';
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
    M.Carousel.getInstance(document.querySelector('.carousel')).next();
    this.autoplay();
  }

  autoplay() {    
    this.timerSlider = combineLatest(timer(4500)).subscribe(() => this.updateSlider());
  }

  setListTopics(key: string, sub: string) {
    this.topicService.getAllBySubject(key, 1, 3).subscribe(
      (response: any) => {
        if(response && response.content && response.content.length > 0) {
          this.subjectTopics[sub] = response.content as Topic[];
        } else {
          this.subjectTopics[sub] = [];
        }
      }
    )
  }

  getRoute(top: Topic) {
    const typeSub = (top.subject as Subject).typeSubject as TypeSubject;
    if(typeSub.name === 'forums') {
      return `/forums/thematique/${top.key}`;
    }
    if(typeSub.name === 'religions') {
      return `/religions/thematique/${top.key}`;
    }
    if(typeSub.name === 'astuces') {
      return `/astuces/thematique/${top.key}`;
    }
  }
}
