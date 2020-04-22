import { Component, OnInit } from '@angular/core';
import { slideToTop } from 'app/layout/animations';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
  animations: [
    slideToTop
 ]
})
export class ListUserComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
