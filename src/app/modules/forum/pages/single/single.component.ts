import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { slideToRight } from 'app/layout/animations';
import { TopicService } from '@service/forum/topic.service';
import { Topic } from '@schema/topic';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss'],
  animations: [
    slideToRight
 ]
})
export class SingleComponent implements OnInit {
  subjectId: string;
  topics: Topic[] = [];
  page: any = {};

  constructor(private route: ActivatedRoute, private topicService: TopicService) { }

  ngOnInit(): void {
    this.subjectId = this.route.snapshot.params.id;
    this.page.currentPage = 1;
    this.page.lastPage = 1;
    this.route.queryParams.subscribe(x => this.loadPage(this.subjectId, x.page || 1));
  }

  private loadPage(key: string, page: number) {
    // get page of items from api
    this.topicService.getAllBySubject(key, page - 1).subscribe(
      (response: any) => {
        console.log(response);
         if(response && response.content && response.content.length > 0) {
          this.topics = response.content as Topic[];
          this.page.currentPage = response.current_page;
          this.page.lastPage = response.last_page;
        }
      }
    )
  }

}
