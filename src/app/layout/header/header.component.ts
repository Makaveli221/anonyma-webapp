import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as M from 'materialize-css';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  optionsSidenav = {
    menuWidth: 300, // Default is 240
    edge: 'left', // Choose the horizontal origin
    draggable: true
  };

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    var sidenavElem = document.querySelectorAll('.sidenav');
    var sideNav = M.Sidenav.init(sidenavElem, this.optionsSidenav);

    var modalElem = document.querySelectorAll('.modal');
    var modal = M.Modal.init(modalElem, {});
  }

}
