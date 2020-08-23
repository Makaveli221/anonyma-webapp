import { SubjectService } from '@service/forum/subject.service';
import { Component, OnInit } from '@angular/core';
import { slideToTop } from 'app/layout/animations';
import { Subject } from '@schema/subject';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeSubject } from '@schema/type-subject';
import { Topic } from '@schema/topic';
import { TopicService } from '@service/forum/topic.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [
    slideToTop
  ]
})
export class ListComponent implements OnInit {
  subjectKey: string;
  subjects: Subject[] = [];
  typeSubject: TypeSubject;
  topics: Topic[] = [];
  pager: any = {};
  initialPage: number;
  fileToShows: any[];

  constructor(private route: ActivatedRoute, private router: Router, private subjectService: SubjectService,  private topicService: TopicService) { }

  ngOnInit(): void {
    this.initialPage = 1;
    this.fileToShows = [];
    this.listSubject();
  }

  updateCurrentSubject(key: string) {
    this.subjectKey = key;
    this.loadTopics(1);
  }

  listSubject() {
    // get page of items from api
    this.subjectService.getTypeByName('astuces').subscribe((res: any) => {
      if(res && res.id) {
        this.typeSubject = res as TypeSubject;
        this.subjectService.getAllDefaultByType(this.typeSubject.name).subscribe(
          (response: any) => {
            if(response && response.length > 0) {
              this.subjects = response as Subject[];
              this.subjectKey = this.subjects[0].key;
              this.route.queryParams.subscribe(x => this.loadTopics(x.page || this.initialPage));
            }
          }
        )
      }
    });
  }

  loadTopics(page: number) {
    // get page of items from api
    this.topicService.getAllBySubject(this.subjectKey, page).subscribe(
      (response: any) => {
        if(response && response.content && response.content.length > 0) {
          const pages = [...Array(response.totalPages + 1).keys()];
          pages.shift();

          this.topics = response.content as Topic[];
          this.topics.forEach((top: Topic) => {
            if(top.imgDefault) {
              this.getFile(top.imgDefault);
            }
          });
          this.pager.current = response.number + 1;
          this.pager.first = response.first;
          this.pager.last = response.last;
          this.pager.pages = pages;
        } else {
          this.topics = [];
          this.pager.pages = 0;
        }
      }
    )
  }

  getFile(filename: string) {
    this.topicService.getFile(filename).subscribe((dataBlob: Blob) => {
      this.createImageFromBlob(filename, dataBlob);
      }, error => {
        console.log(error);
      });
  }

  createImageFromBlob(filename: string, image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
       this.fileToShows[filename] = reader.result;
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
  }

}
