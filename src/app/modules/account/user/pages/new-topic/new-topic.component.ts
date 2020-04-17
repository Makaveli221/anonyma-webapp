import { Component, OnInit } from '@angular/core';
import { slideToLeft } from 'app/layout/animations';

@Component({
  selector: 'app-new-topic',
  templateUrl: './new-topic.component.html',
  styleUrls: ['./new-topic.component.scss'],
  animations: [
    slideToLeft
 ]
})
export class NewTopicComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
