import { Component, OnInit, AfterViewInit, HostListener, ElementRef } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { jackInTheBox, fadeInRight, rotateInDownLeft } from 'ng-animate';

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
    trigger('rotateInDownLeft', [transition('* => *', useAnimation(rotateInDownLeft))])
 ]
})
export class AccueilComponent implements OnInit, AfterViewInit {
  bounce: any;
  fadeInRight: any;
  forums: Subject[] = [];
  religions: Subject[] = [];
  astuces: Subject[] = [];
  lastTopics: Topic[] = [];
  lastComments: Comment[] = [];
  countForum: number = 0;
  countReligion: number = 0;
  countAstuce: number = 0;
  state = {
    pub: 'hide'
  }

  constructor(public el: ElementRef, private subjectService: SubjectService, private topicService: TopicService) { }

  ngOnInit(): void {
    this.subjectService.getAllByType('forums', 1, 3).subscribe(
      (response: any) => {
        if(response && response.content && response.content.length > 0) {
          this.forums = response.content as Subject[];
          this.countForum = response.totalElements;
        }
      }
    );
    this.subjectService.getAllByType('religions', 1, 3).subscribe(
      (response: any) => {
        if(response && response.content && response.content.length > 0) {
          this.religions = response.content as Subject[];
          this.countReligion = response.totalElements;
        }
      }
    );
    this.subjectService.getAllByType('astuces', 1, 3).subscribe(
      (response: any) => {
        if(response && response.content && response.content.length > 0) {
          this.astuces = response.content as Subject[];
          this.countAstuce = response.totalElements;
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

    (document.querySelector('.tabs .indicator') as HTMLElement).style.backgroundColor = '#ffffff';
    (document.querySelector('.tabs .indicator') as HTMLElement).style.height = '5px';
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const elePubPosition = this.el.nativeElement.querySelector('#rightContent');
    const scrollPosition = window.pageYOffset;

    if (elePubPosition && (scrollPosition >= elePubPosition.offsetTop + 10)) {
      this.state.pub = 'show';
    }
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
