import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { slideToTop } from 'app/layout/animations';
import * as M from 'materialize-css';

import { AuthenticationService } from '@service/authentication.service';
import { TopicService } from '@service/forum/topic.service';
import { Topic } from '@schema/topic';
import { Subject } from '@schema/subject';

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

  constructor(private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService, private topicService: TopicService) { }

  ngOnInit(): void {
    this.nameType = this.route.snapshot.data.name;
    this.topicService.get(this.route.snapshot.paramMap.get('id')).subscribe((response: any) => {
      if(!response || !response.id) {
        this.router.navigate([`/${this.nameType}`]);
        return false;
      }
      this.currentTopic = response as Topic;
      this.subject = this.currentTopic.subject as Subject;
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

  animateButton(id: string) {
    let btn = document.querySelector('#'+ id) as HTMLButtonElement;
    //reset animation
    btn.classList.remove('animate');
    
    btn.classList.add('animate');
    setTimeout(function(){
      btn.classList.remove('animate');
    },700);
  }

  updateCurrentTopic(topic: Topic) {
    this.currentTopic = topic;
    this.router.navigate(['/thematique/'+ topic.key]);
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
}
