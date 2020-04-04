import { Component, OnInit, AfterViewInit } from '@angular/core';
import { slideToTop } from 'app/layout/animations';

import * as M from 'materialize-css';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
  animations: [
    slideToTop
 ]
})
export class AccueilComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    var TabsElem = document.querySelectorAll('.tabs');
    var tab = M.Tabs.init(TabsElem, {
      // swipeable: true
    });

    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems, {});

    (document.querySelector('.tabs .indicator') as HTMLElement).style.backgroundColor = '#ffffff';
    (document.querySelector('.tabs .indicator') as HTMLElement).style.height = '5px';
    // (document.querySelector('.tabs-content.carousel') as HTMLElement).style.height = (244 * 3 + 100) + "px";
  }

}
