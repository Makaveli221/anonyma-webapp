import { SubjectService } from '@service/forum/subject.service';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import * as M from 'materialize-css';
import { timer, combineLatest } from 'rxjs';
import { slideToTop } from 'app/layout/animations';
import { Subject } from '@schema/subject';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeSubject } from '@schema/type-subject';
import { TopicService } from '@service/forum/topic.service';
import { Topic } from '@schema/topic';
import { Message } from '@schema/message';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '@service/forum/message.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [
    slideToTop
  ]
})
export class ListComponent implements OnInit, AfterViewInit, OnDestroy {
  subjectKey: string;
  subjects: Subject[] = [];
  typeSubject: TypeSubject;
  topics: Topic[] = [];
  pager: any = {};
  initialPage: number;
  timerSlider: any;
  messageForm: FormGroup;
  histoires: Message[];
  isLoading: boolean;
  submitted: boolean;

  constructor(private formBuilder: FormBuilder, private messageService: MessageService, private route: ActivatedRoute, private router: Router, private subjectService: SubjectService,  private topicService: TopicService) { }

  ngOnInit(): void {
    this.histoires = [];
    this.initialPage = 1;
    this.submitted = false;
    this.isLoading = false;
    this.listSubject();
    this.buildForm();
    this.getLsteHistory();
  }

  get f () {
    return this.messageForm.controls;
  }

  ngAfterViewInit(): void {

    M.Carousel.init(document.querySelectorAll('.carousel'), {
      dist: 0,
      padding: 0,
      fullWidth: true,
      indicators: true,
      duration: 200,
    });

    this.autoplay();
  }

  ngOnDestroy(): void {
    if (this.timerSlider) {
      this.timerSlider.unsubscribe();
    } 
  }

  updateCurrentSubject(key: string) {
    this.subjectKey = key;
    this.loadTopics(1);
  }

  listSubject() {
    // get page of items from api
    this.subjectService.getTypeByName('forums').subscribe((res: any) => {
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

  updateSlider() {
    M.Carousel.getInstance(document.querySelector('.carousel')).next();
    this.autoplay();
  }

  autoplay() {    
    this.timerSlider = combineLatest(timer(4500)).subscribe(() => this.updateSlider());
  }

  addHistory() {
    this.submitted = true;
    this.isLoading = true;

    // stop here if form is invalid
    if (this.messageForm.invalid) {
      return;
    }

    const newMessage: Message = this.messageForm.value as Message;

    this.messageService.create(newMessage).subscribe((res: any) => {
      var toastHTML = '<span>Votre histoire a été enregistré avec succès</span><button class="btn-flat toast-action" onclick="M.toast.dismiss();">Fermer</button>';
      M.toast({html: toastHTML});
      this.messageForm.reset();
      this.submitted = false;
      this.isLoading = false;
      this.messageForm.controls.type.setValue('history');
    });
  }

  private buildForm(): void {
    this.messageForm = this.formBuilder.group({
      type: ['history'],
      email: ['', [Validators.required, Validators.email]],
      texte: ['', Validators.required]
    });
  }

  getLsteHistory() {
    this.messageService.allHistoryPublished().subscribe((res: any) => {
      this.histoires = res as Message[];
    });
  }
}
