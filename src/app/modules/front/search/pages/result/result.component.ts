import { Component, OnInit } from '@angular/core';
import { slideToTop } from 'app/layout/animations';
import { Subject } from '@schema/subject';
import { SubjectService } from '@service/forum/subject.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  animations: [
    slideToTop
  ]
})
export class ResultComponent implements OnInit {
  forums: Subject[] = [];
  religions: Subject[] = [];
  astuces: Subject[] = [];
  countForum: number = 0;
  countReligion: number = 0;
  countAstuce: number = 0;

  constructor(private subjectService: SubjectService) { }

  ngOnInit(): void {
    this.subjectService.getAllByType('forums', 1, 3).subscribe(
      (response: any) => {
        if(response && response.content && response.content.length > 0) {
          this.forums = response.content as Subject[];
          this.countForum = response.totalElements;
        }
      }
    );
    this.subjectService.getAllByType('religions', 1, 3).subscribe(
      (response: any) => {
        if(response && response.content && response.content.length > 0) {
          this.religions = response.content as Subject[];
          this.countReligion = response.totalElements;
        }
      }
    );
    this.subjectService.getAllByType('astuces', 1, 3).subscribe(
      (response: any) => {
        if(response && response.content && response.content.length > 0) {
          this.astuces = response.content as Subject[];
          this.countAstuce = response.totalElements;
        }
      }
    );
  }

}
