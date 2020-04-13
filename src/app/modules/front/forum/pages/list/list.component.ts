import { SubjectService } from '@service/forum/subject.service';
import { Component, OnInit } from '@angular/core';
import { slideToTop } from 'app/layout/animations';
import { Subject } from '@schema/subject';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [
    slideToTop
 ]
})
export class ListComponent implements OnInit {
  subjects: Subject[] = [];
  pager: any = {};
  initialPage: number;

  constructor(private route: ActivatedRoute, private subjectService: SubjectService) { }

  ngOnInit(): void {
    this.initialPage = 1;
    this.route.queryParams.subscribe(x => this.loadPage(x.page || this.initialPage));
  }

  loadPage(page: number) {
    // get page of items from api
    this.subjectService.all(page).subscribe(
      (response: any) => {
        if(response && response.content && response.content.length > 0) {
          this.subjects = response.content as Subject[];
          const pages = [...Array(response.totalPages + 1).keys()];
          pages.shift();

          this.pager.current = response.number + 1;
          this.pager.first = response.first;
          this.pager.last = response.last;
          this.pager.pages = pages;
        }
      }
    )
  }

}
