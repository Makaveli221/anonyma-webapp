import { Component, OnInit, Input } from '@angular/core';
import { TopicService } from '@service/forum/topic.service';
import { Comment } from '@schema/comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() key: string;
  id: String;
  comments: Comment [];

  constructor(private topicService: TopicService) { }

  ngOnInit(): void {
    this.comments = [];
    this.topicService.getAllComments(this.key).subscribe((res: any) => {
      console.log(res);
    })
  }

  animateButton(id: string) {
    const btn = ((event.target || event.srcElement || event.currentTarget) as HTMLButtonElement).parentElement;
    btn.classList.remove('animate');
    btn.classList.add('animate');
    setTimeout(function(){
      btn.classList.remove('animate');
    },700);
  }

}
