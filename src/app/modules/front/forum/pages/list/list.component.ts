import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import * as M from 'materialize-css';
import { timer, combineLatest } from 'rxjs';
import { slideToTop } from 'app/layout/animations';
import { ActivatedRoute, Router } from '@angular/router';
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
  pager: any = {};
  initialPage: number;
  timerSlider: any;
  messageForm: FormGroup;
  derniershistoires: Message[];
  histoires: Message[];
  isLoading: boolean;
  submitted: boolean;

  constructor(private formBuilder: FormBuilder, private messageService: MessageService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.histoires = [];
    this.derniershistoires = [];
    this.initialPage = 1;
    this.submitted = false;
    this.isLoading = false;
    this.route.queryParams.subscribe(x => this.loadPage(x.page || this.initialPage));
    this.messageService.getLastHistory().subscribe((res: any) => {
      console.log(res);
      this.derniershistoires = res as Message[];
    });
    this.buildForm();
  }

  loadPage(page: number) {
    this.messageService.allHistoryPublished(page).subscribe((res: any) => {
      if (res && !res.empty) {
        const pages = [...Array(res.totalPages + 1).keys()];
        pages.shift();

        this.histoires = res.content as Message[];
        this.pager.current = res.number + 1;
        this.pager.first = res.first;
        this.pager.last = res.last;
        this.pager.pages = pages;
      }
    });
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
}
