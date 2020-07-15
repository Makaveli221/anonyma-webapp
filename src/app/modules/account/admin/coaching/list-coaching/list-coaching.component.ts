import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { slideToTop } from 'app/layout/animations';
import { Subject } from '@schema/subject';
import { TypeSubject } from '@schema/type-subject';
import { SubjectService } from '@service/forum/subject.service';

@Component({
  selector: 'app-list-coaching',
  templateUrl: './list-coaching.component.html',
  styleUrls: ['./list-coaching.component.scss'],
  animations: [
    slideToTop
  ]
})
export class ListCoachingComponent implements OnInit {
  subjects: Subject[];
  typeSubject: TypeSubject;
  pager: any = {};
  initialPage: number;

  constructor(private route: ActivatedRoute, private subjectService: SubjectService) { }

  ngOnInit(): void {
    this.initialPage = 1;
    this.route.queryParams.subscribe(x => this.loadPage(x.page || this.initialPage));
  }

  loadPage(page: number) {
    this.subjectService.getTypeByName('coaching').subscribe((res: any) => {
      if(res && res.id) {
        this.typeSubject = res as TypeSubject;
        this.subjectService.getAllByType(this.typeSubject.name, page).subscribe(
          (response: any) => {
            if(response && !response.empty) {
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
    });
  }
}
