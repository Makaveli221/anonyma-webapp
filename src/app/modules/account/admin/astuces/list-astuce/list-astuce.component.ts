import { Component, OnInit } from '@angular/core';
import { Subject } from '@schema/subject';
import { ActivatedRoute } from '@angular/router';
import { SubjectService } from '@service/forum/subject.service';
import { slideToTop } from 'app/layout/animations';

@Component({
  selector: 'app-list-astuce',
  templateUrl: './list-astuce.component.html',
  styleUrls: ['./list-astuce.component.scss'],
  animations: [
    slideToTop
 ]
})
export class ListAstuceComponent implements OnInit {
  subjects: Subject[];
  pager: any = {};
  initialPage: number;

  constructor(private route: ActivatedRoute, private subjectService: SubjectService) { }

  ngOnInit(): void {
    this.initialPage = 1;
    this.route.queryParams.subscribe(x => this.loadPage(x.page || this.initialPage));
  }

  loadPage(page: number) {
    this.subjectService.getAllByType('astuces', page).subscribe(
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
