import { Component, OnInit } from '@angular/core';
import { Subject } from '@schema/subject';
import { ActivatedRoute } from '@angular/router';
import { SubjectService } from '@service/forum/subject.service';
import { slideToTop } from 'app/layout/animations';

@Component({
  selector: 'app-list-religion',
  templateUrl: './list-religion.component.html',
  styleUrls: ['./list-religion.component.scss'],
  animations: [
    slideToTop
 ]
})
export class ListReligionComponent implements OnInit {
  subjects: Subject[];
  pager: any = {};
  initialPage: number;

  constructor(private route: ActivatedRoute, private subjectService: SubjectService) { }

  ngOnInit(): void {
    this.initialPage = 1;
    this.route.queryParams.subscribe(x => this.loadPage(x.page || this.initialPage));
  }

  loadPage(page: number) {
    this.subjectService.getAllByType('religions', page).subscribe(
      (response: any) => {
        if(response && response.content && response.content.length > 0) {
          const pages = [...Array(response.totalPages + 1).keys()];
          pages.shift();

          this.subjects = response.content as Subject[];
          this.pager.current = response.number + 1;
          this.pager.first = response.first;
          this.pager.last = response.last;
          this.pager.pages = pages;
        }
      }
    )
  }

}
