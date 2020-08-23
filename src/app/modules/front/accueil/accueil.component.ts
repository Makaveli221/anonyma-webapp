import { Component, OnInit, AfterViewInit, HostListener, ElementRef, OnDestroy } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { jackInTheBox, fadeInRight, pulse } from 'ng-animate';
import { timer, combineLatest } from 'rxjs';

import * as M from 'materialize-css';
import { SubjectService } from '@service/forum/subject.service';
import { TopicService } from '@service/forum/topic.service';
import { Subject } from '@schema/subject';
import { TypeSubject } from '@schema/type-subject';
import { Topic } from '@schema/topic';
import { Comment } from '@schema/comment';
import { Message } from '@schema/message';
import { TeaserService } from '@service/forum/teaser.service';
import { Teaser } from '@schema/teaser';
import { MessageService } from '@service/forum/message.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
  animations: [
    trigger('bounce', [transition('* => *', useAnimation(jackInTheBox))]),
    trigger('fadeInRight', [transition('* => *', useAnimation(fadeInRight))]),
    trigger('pulse', [transition('* => *', useAnimation(pulse))])
 ]
})
export class AccueilComponent implements OnInit, AfterViewInit, OnDestroy {
  bounce: any;
  fadeInRight: any;
  pulse: any;
  lastComments: Comment[] = [];
  teasers: Teaser[];
  isFileLoading = true;
  fileToShows: any[];
  configCarousel = {
    dist: 0,
    padding: 0,
    fullWidth: true,
    indicators: true,
    duration: 200
  }
  state = {
    pub: 'hide'
  }
  histoires: Message[];
  displaySlide = false;
  timerSlider: any;
  config = {
    // nextButton: '.swiper-button-next',
    // prevButton: '.swiper-button-prev',
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    loop: true,
    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
    }
  }

  constructor(public el: ElementRef, private teaserService: TeaserService, private topicService: TopicService,  private messageService: MessageService) { }

  ngOnInit(): void {
    this.teasers = [];
    this.histoires = [];
    this.fileToShows = [];
    this.teaserService.all().subscribe((res: any) => {
      this.teasers = res as Teaser[];
      this.teasers.forEach((tea: Teaser) => {
        this.getFile(tea.presentation);
      });
    });
    this.topicService.getLastComments().subscribe((response: any) => {
      if(response && response.length > 0) {
        this.lastComments = response as Comment[];
      }
    });
    this.messageService.allHistoryPublished(1).subscribe((res: any) => {
      if (res && !res.empty) {
        this.histoires = res.content as Message[];
        this.displaySlide = true;
      }
    });
  }

  ngAfterViewInit(): void {

    M.Carousel.init(document.querySelector('#carousel-intro'), this.configCarousel);

    M.Carousel.init(document.querySelector('#carousel-pub'), this.configCarousel);

    M.Carousel.init( document.querySelector('#carousel-forum'), {});

    this.autoplay();
  }

  ngOnDestroy(): void {
    if (this.timerSlider) {
      this.timerSlider.unsubscribe();
    } 
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const elePubPosition = this.el.nativeElement.querySelector('#rightContent');
    const scrollPosition = window.pageYOffset;

    if (elePubPosition && (scrollPosition >= elePubPosition.offsetTop + 10)) {
      this.state.pub = 'show';
    }
  }

  updateSlider() {
    M.Carousel.getInstance(document.querySelector('#carousel-intro')).next();
    M.Carousel.getInstance(document.querySelector('#carousel-pub')).next();
    this.autoplay();
  }

  autoplay() {    
    this.timerSlider = combineLatest(timer(4500)).subscribe(() => this.updateSlider());
  }

  getRoute(type: string, source: any) {
    let urlPage = '';
    switch (type) {
      case 'topic':
        const typeSub = (source.subject as Subject).typeSubject as TypeSubject;
        if(typeSub.name === 'forums') {
          urlPage = `/forums/thematique/${source.key}`;
        }
        if(typeSub.name === 'religions') {
          urlPage = `/religions/thematique/${source.key}`;
        }
        if(typeSub.name === 'astuces') {
          urlPage = `/astuces/thematique/${source.key}`;
        }
        break;
    
      case 'histoire':
        urlPage = `/forums/${source.id}/details`;
        break;
      default:
        break;
    }
    return urlPage;
  }

  getTeaserType(filename: string) {
    const videos = ['mp4', 'mp3'];
    const images = ['jpg', 'jpeg', 'png', 'gif'];
    let type = '';
    const ext = (filename.substring(filename.lastIndexOf('.')+1, filename.length) || filename).toLowerCase();
    if (videos.indexOf(ext) != -1) {
      type = 'video';
    }
    if (images.indexOf(ext) != -1) {
      type = 'image';
    }
    return type;
  }

  getFile(filename: string) {
    this.teaserService.getFile(filename).subscribe((dataBlob: Blob) => {
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
