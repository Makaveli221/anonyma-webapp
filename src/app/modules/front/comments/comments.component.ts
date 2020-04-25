import { Component, OnInit, Input, OnDestroy, ElementRef, AfterViewInit } from '@angular/core';
import { TopicService } from '@service/forum/topic.service';
import * as M from 'materialize-css';

import { Comment } from '@schema/comment';
import { Appreciation } from '@schema/appreciation';
import { timer, combineLatest } from 'rxjs';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() key: string;
  @Input() id: string;
  @Input() isAuthenticated: boolean;
  isLoading: boolean;
  comments: Comment [];
  postsSubscription: any;
  timerSubscription: any;
  commentsSubscription: any;

  constructor(private topicService: TopicService, private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.comments = [];
    this.isLoading = false;
    this.refreshData();
  }

  ngAfterViewInit(): void {
    if(this.isAuthenticated) {
      this.listenSubmitForm();
    }
  }

  public ngOnDestroy(): void {
    if (this.postsSubscription) {
        this.postsSubscription.unsubscribe();
    }
    if (this.timerSubscription) {
        this.timerSubscription.unsubscribe();
    }
  }

  private refreshData(): void {
    this.commentsSubscription = this.topicService.getAllComments(this.key).subscribe((res: any) => {
      if(res && res.content && res.content.length > 0) {
        this.comments = res.content as Comment[];
        console.log('update');
        setTimeout(() => {
          this.animateButton(this.elementRef.nativeElement.querySelectorAll('div.heart'));
        });
      }
      this.subscribeToData();
    })
  }

  private subscribeToData(): void {
    this.timerSubscription = combineLatest(timer(5000)).subscribe(() => this.refreshData());
  }

  animateButton(hearts: any) {
    hearts.forEach((ele: HTMLElement) => {
      ele.addEventListener('click', (e) => {
        ele.classList.toggle('is_animating');
        setTimeout(function(){
          ele.classList.toggle('is_animating');
        },700);
      });
    });
  }

  countLike(like: boolean, appreciations?: Appreciation[]) {
    if (!appreciations || appreciations.length <= 0) {
      return 0;
    }
    const result = appreciations.filter(app => app.liked == like);
    return result.length;
  }

  listenSubmitForm() {
    this.elementRef.nativeElement.querySelector('#save-comment').addEventListener('click', (event) => {
      if(this.isLoading === true) {
        return;
      }
      this.isLoading = true;
      let form = ((event.target || event.srcElement || event.currentTarget) as HTMLButtonElement).closest('form');
      this.saveComment(form);
    })
  }

  saveComment(form: HTMLElement) {
    const sourceCom = (form.querySelector('.source') as HTMLInputElement).value;
    const idSourceCom = (form.querySelector('.id-source') as HTMLInputElement).value;
    const messageCom = (form.querySelector('.message') as HTMLInputElement).value;

    if (!sourceCom || !idSourceCom || !messageCom) {
      this.isLoading = false;
      return;
    }
    const data = {source: sourceCom, idSource: idSourceCom, message: messageCom};
    this.topicService.addComment(data).subscribe((res: any) => {
      if(res && res.id) {
        setTimeout(() => {
          (form.querySelector('.message') as HTMLInputElement).value = '';
          var toastHTML = '<span>Votre commentaire a été ajouté avec succès</span><button class="btn-flat toast-action" onclick="M.toast.dismiss();">Fermer</button>';
          M.toast({html: toastHTML});
          this.isLoading = false;
        }, 2000);
      }
    })
  }

}
