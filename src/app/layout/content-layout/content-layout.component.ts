import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as M from 'materialize-css';


@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss']
})
export class ContentLayoutComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'), {});
  }

  activeChat() {
    
  }

}
