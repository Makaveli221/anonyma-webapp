import { Component, OnInit } from '@angular/core';
import { Topic } from '@schema/topic';
import { Router, ActivatedRoute } from '@angular/router';
import { TopicService } from '@service/forum/topic.service';
import { SubjectService } from '@service/forum/subject.service';
import { Subject } from '@schema/subject';
import { slideToTop } from 'app/layout/animations';

@Component({
  selector: 'app-new-topic',
  templateUrl: './new-topic.component.html',
  styleUrls: ['./new-topic.component.scss'],
  animations: [
    slideToTop
 ]
})
export class NewTopicComponent implements OnInit {
  currentTopic: Topic;
  subject: Subject;
  nameType: string;
  key: string;
  canLoad = false;

  constructor(private router: Router, private route: ActivatedRoute, private topicService: TopicService, private subjectService: SubjectService) { }

  ngOnInit(): void {
    this.nameType = this.route.snapshot.url[0].path;
    this.key = this.route.snapshot.paramMap.get('key');
    this.subjectService.get(this.key).subscribe((res: any) => {
      if(res && res.id) {
        this.subject = res as Subject;
        if(this.route.snapshot.paramMap.get('id')) {
          this.topicService.get(this.route.snapshot.paramMap.get('id')).subscribe((response: any) => {
            if(!response || !response.id || !response.createUser) {
              this.router.navigate(['/account/admin', this.nameType, this.key,'topics']);
              return false;
            }
            this.canLoad = true;
            this.currentTopic = response as Topic;
          });
        } else {
          this.canLoad = true;
          this.currentTopic = null;
        }
      } else {
        this.router.navigate(['/account/admin', this.nameType ]);
      }
    });
  }

  onFormSubmit(valid: boolean): void {
    if (valid) {
      this.router.navigate(['/account/admin', this.nameType, this.key,'topics']);
    }
  }
}
