import { Component, OnInit } from '@angular/core';
import { slideToRight } from 'app/layout/animations';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss'],
  animations: [
    slideToRight
 ]
})
export class SingleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
