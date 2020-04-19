import { AuthenticationService } from './../../../../../data/service/authentication.service';
import { Component, OnInit } from '@angular/core';
import { slideToLeft } from 'app/layout/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { TopicService } from '@service/forum/topic.service';
import { Topic } from '@schema/topic';

@Component({
  selector: 'app-new-topic',
  templateUrl: './new-topic.component.html',
  styleUrls: ['./new-topic.component.scss'],
  animations: [
    slideToLeft
 ]
})
export class NewTopicComponent implements OnInit {
  currentTopic: Topic;
  canLoad = false;

  constructor(private router: Router, private route: ActivatedRoute, private topicService: TopicService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    if(this.route.snapshot.paramMap.get('id')) {
      this.topicService.get(this.route.snapshot.paramMap.get('id')).subscribe((response: any) => {
        if(!response || !response.id || !response.createUser) {
          this.router.navigate(['/account/user/my-topics']);
          return false;
        }
        if(this.authenticationService.currentUserValue.id !== response.createUser.id) {
          this.router.navigate(['/access-denied']);
          return false;
        }
        this.canLoad = true;
        this.currentTopic = response as Topic;
      });
    } else {
      this.canLoad = true;
      this.currentTopic = null;
    }
  }

  onFormSubmit(valid: boolean): void {
    if (valid) {
      this.router.navigate(['/account/user/my-topics']);
    }
  }

}
