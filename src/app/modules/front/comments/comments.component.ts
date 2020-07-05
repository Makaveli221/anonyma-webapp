import { Component, OnInit, Input, OnDestroy, ElementRef, AfterViewInit } from '@angular/core';
import { TopicService } from '@service/forum/topic.service';
import * as M from 'materialize-css';

import { Comment } from '@schema/comment';
import { Appreciation } from '@schema/appreciation';
import { timer, combineLatest } from 'rxjs';
import { MessageService } from '@service/forum/message.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() key?: string;
  @Input() id: string;
  @Input() source: String;
  isLoading: boolean;
  comments: Comment [];
  postsSubscription: any;
  timerSubscription: any;
  commentsSubscription: any;

  constructor(private topicService: TopicService, private messageService: MessageService, private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.comments = [];
    this.isLoading = false;
    this.refreshData();
  }

  ngAfterViewInit(): void {
    this.listenSubmitForm();
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
    switch (this.source) {
      case 'topic':
        this.getCommentsOfTopic();
        break;

      case 'histoire':
        this.getCommentsOfMessage();
        break;
    
      default:
        break;
    }
    console.log(this.comments);
  }

  getCommentsOfTopic() {
    this.commentsSubscription = this.topicService.getAllComments(this.key).subscribe((res: any) => {
      if(res && res && res.length != this.comments.length) {
        this.comments = res as Comment[];
      }
      this.subscribeToData();
    });
  }

  getCommentsOfMessage() {
    this.commentsSubscription = this.messageService.getAllComments(this.id).subscribe((res: any) => {
      if(res && res && res.length != this.comments.length) {
        this.comments = res as Comment[];
      }
      this.subscribeToData();
    });
  }

  private subscribeToData(): void {
    this.timerSubscription = combineLatest(timer(5000)).subscribe(() => this.refreshData());
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
    const sourceCom = this.source;
    const idSourceCom = this.id;
    const messageCom = (form.querySelector('.message') as HTMLInputElement).value;

    if (!sourceCom || !idSourceCom || !messageCom) {
      this.isLoading = false;
      return;
    }
    const data = {source: sourceCom, idSource: idSourceCom, message: messageCom};
    switch (this.source) {
      case 'topic':
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
        break;

      case 'histoire':
        this.messageService.addComment(data).subscribe((res: any) => {
          if(res && res.id) {
            setTimeout(() => {
              (form.querySelector('.message') as HTMLInputElement).value = '';
              var toastHTML = '<span>Votre commentaire a été ajouté avec succès</span><button class="btn-flat toast-action" onclick="M.toast.dismiss();">Fermer</button>';
              M.toast({html: toastHTML});
              this.isLoading = false;
            }, 2000);
          }
        })
        break;
    
      default:
        break;
    }
  }

}
