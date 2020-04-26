import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { slideToTop } from 'app/layout/animations';
import * as M from 'materialize-css';

import { AuthenticationService } from '@service/authentication.service';
import { TopicService } from '@service/forum/topic.service';
import { Topic } from '@schema/topic';
import { Subject } from '@schema/subject';
import { Appreciation } from '@schema/appreciation';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: [
    slideToTop
  ]
})
export class IndexComponent implements OnInit, AfterViewInit {
  subject: Subject;
  currentTopic: Topic;
  topics: Topic[] = [];
  nameType: string;
  countLiked = 0;
  liked = false;

  constructor(private route: ActivatedRoute, private router: Router, private elementRef: ElementRef, private authenticationService: AuthenticationService, private topicService: TopicService) { }

  ngOnInit(): void {
    this.nameType = this.route.snapshot.data.name;
    this.topicService.get(this.route.snapshot.paramMap.get('id')).subscribe((response: any) => {
      if(!response || !response.id) {
        this.router.navigate([`/${this.nameType}`]);
        return false;
      }
      this.currentTopic = response as Topic;
      this.subject = this.currentTopic.subject as Subject;
      setTimeout(() => {
        this.animateButton(this.elementRef.nativeElement.querySelectorAll('div.heart'));
      });
      this.countLiked = this.countLike(true, this.currentTopic.appreciations);
      this.topicService.getAllBySubject(this.subject.key, 1, -1).subscribe((response: any) => {
        if(response && response.content && response.content.length > 0) {
          this.topics = response.content as Topic[];
        }
      })
    });
  }

  ngAfterViewInit(): void {
    M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'), {});
  }

  scrollToElement($element: HTMLElement): void {
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  animateButton(hearts: any) {
    if (!this.isAuthenticated()) {
      return;
    }
    hearts.forEach((ele: HTMLElement) => {
      ele.addEventListener('click', (e) => {
        ele.classList.toggle('is_animating');
        setTimeout(function(){
          ele.classList.toggle('is_animating');
        },700);
      });
    });
  }

  updateCurrentTopic(topic: Topic) {
    this.currentTopic = topic;
    this.router.navigate([`/${this.nameType}/thematique/${topic.key}`]);
  }

  getCreateUser(u: any) {
    return `${u.firstName} ${u.lastName}`;
  }

  isAuthenticated() {
    return this.authenticationService.isAuthenticated();
  }

  goToLoginPage() {
    this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
  }

  countLike(like: boolean, appreciations?: Appreciation[]) {
    if (!appreciations || appreciations.length <= 0) {
      return 0;
    }
    this.liked = false;
    const result = appreciations.filter((app: Appreciation) => {
      if(this.isAuthenticated() && (app.liked == true) && (app.user.email == this.authenticationService.currentUserValue.email)) {
        this.liked = true;
      }
      return app.liked == like;
    });
    return result.length;
  }

  addLike(event: any) {
    if (!this.isAuthenticated()) {
      return;
    }
    this.topicService.addLike(this.currentTopic.key, +(!this.liked)).subscribe((res: any) => {
      if (res && res.length > 0) {
        ((event.target || event.srcElement || event.currentTarget) as HTMLButtonElement).classList.toggle('active');
        this.currentTopic.appreciations = res as Appreciation[];
        this.countLiked = this.countLike(true, this.currentTopic.appreciations);
      }
    })
  }
}
