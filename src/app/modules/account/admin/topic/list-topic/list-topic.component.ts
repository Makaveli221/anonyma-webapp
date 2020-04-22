import { Component, OnInit } from '@angular/core';
import { slideToTop } from 'app/layout/animations';
import { Topic } from '@schema/topic';
import { ActivatedRoute, Router } from '@angular/router';
import { TopicService } from '@service/forum/topic.service';
import { SubjectService } from '@service/forum/subject.service';
import { Subject } from '@schema/subject';


@Component({
  selector: 'app-list-topic',
  templateUrl: './list-topic.component.html',
  styleUrls: ['./list-topic.component.scss'],
  animations: [
    slideToTop
 ]
})
export class ListTopicComponent implements OnInit {
  subject: Subject;
  topics: Topic[] = [];
  nameType: string;
  pager: any = {};
  initialPage: number;

  constructor(private route: ActivatedRoute, private router: Router, private topicService: TopicService, private subjectService: SubjectService) { }

  ngOnInit(): void {
    this.initialPage = 1;
    this.nameType = this.route.snapshot.url[0].path;
    this.route.queryParams.subscribe(x => this.loadPage(x.page || this.initialPage));
  }

  loadPage(page: number) {
    this.subjectService.get(this.route.snapshot.paramMap.get('key')).subscribe((res: any) => {
      if(res && res.id) {
        this.subject = res as Subject;
        this.topicService.getAllBySubject(this.subject.key, page).subscribe(
          (response: any) => {
            if(response && response.content && response.content.length > 0) {
              const pages = [...Array(response.totalPages + 1).keys()];
              pages.shift();
    
              this.topics = response.content as Topic[];
              this.pager.current = response.number + 1;
              this.pager.first = response.first;
              this.pager.last = response.last;
              this.pager.pages = pages;
            }
          }
        )
      } else {
        this.router.navigate(['/account/admin', this.nameType]);
      }
    })
  }

  getSubjetTitle(subject: any) {
    return subject.title;
  }

}
