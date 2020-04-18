import { Component, OnInit } from '@angular/core';
import { slideToLeft } from 'app/layout/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-topic',
  templateUrl: './new-topic.component.html',
  styleUrls: ['./new-topic.component.scss'],
  animations: [
    slideToLeft
 ]
})
export class NewTopicComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onFormSubmit(valid: boolean): void {
    if (valid) {
      this.router.navigate(['/account/user/my-topics']);
    }
  }

}
