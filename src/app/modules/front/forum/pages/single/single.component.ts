import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { slideToRight } from 'app/layout/animations';
import { TopicService } from '@service/forum/topic.service';
import { Topic } from '@schema/topic';

import { Subject } from '@schema/subject';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss'],
  animations: [
    slideToRight
 ]
})
export class SingleComponent implements OnInit {
  subjectKey: string;
  subject: Subject;
  topics: Topic[] = [];
  pager: any = {};
  initialPage: number;

  constructor(private route: ActivatedRoute, private topicService: TopicService) {}

  ngOnInit(): void {
    this.subjectKey = this.route.snapshot.params.id;
    this.initialPage = 1;
    this.route.queryParams.subscribe(x => this.loadPage(x.page || this.initialPage));
  }

  loadPage(page: number) {
    // get page of items from api
    this.topicService.getAllBySubject(this.subjectKey, page).subscribe(
      (response: any) => {
        if(response && response.content && response.content.length > 0) {
          const pages = [...Array(response.totalPages + 1).keys()];
          pages.shift();

          this.topics = response.content as Topic[];
          this.pager.current = response.number + 1;
          this.pager.first = response.first;
          this.pager.last = response.last;
          this.pager.pages = pages;
          this.subject = this.topics[0].subject as Subject;
        }
      }
    )
  }
}
