import { Component, OnInit } from '@angular/core';
import { slideToTop } from 'app/layout/animations';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [
    slideToTop
 ]
})
export class ListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
