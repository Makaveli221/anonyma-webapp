import { Component, OnInit } from '@angular/core';
import { slideToTop } from 'app/layout/animations';
import { Topic } from '@schema/topic';
import { TopicService } from '@service/forum/topic.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mes-sujets',
  templateUrl: './mes-sujets.component.html',
  styleUrls: ['./mes-sujets.component.scss'],
  animations: [
    slideToTop
 ]
})
export class MesSujetsComponent implements OnInit {
  topics: Topic[] = [];
  pager: any = {};
  initialPage: number;

  constructor(private route: ActivatedRoute, private topicService: TopicService) { }

  ngOnInit(): void {
    this.initialPage = 1;
    this.route.queryParams.subscribe(x => this.loadPage(x.page || this.initialPage));
  }

  loadPage(page: number) {
    // get page of items from api
    // this.topicService.getAllBySubject('this.subjectKey', page).subscribe(
    //   (response: any) => {
    //     if(response && response.content && response.content.length > 0) {
    //       const pages = [...Array(response.totalPages + 1).keys()];
    //       pages.shift();

    //       this.topics = response.content as Topic[];
    //       this.pager.current = response.number + 1;
    //       this.pager.first = response.first;
    //       this.pager.last = response.last;
    //       this.pager.pages = pages;
    //     }
    //   }
    // )
  }

}
