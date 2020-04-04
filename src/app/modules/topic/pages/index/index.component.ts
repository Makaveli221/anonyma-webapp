import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as M from 'materialize-css';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'), {});
  }

  scrollToElement($element): void {
    console.log($element);
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  animateButton(id) {
    let btn = document.querySelector('#'+ id) as HTMLButtonElement;
    //reset animation
    btn.classList.remove('animate');
    
    btn.classList.add('animate');
    setTimeout(function(){
      btn.classList.remove('animate');
    },700);
  }

  updateListThematique(event, sujet: string) {
    document.querySelector('#sujet-forum a.active').classList.remove('active');
    (event.target as HTMLElement).classList.add('active');
    this.scrollToElement(document.querySelector('#thematiques-sujet'));
  }

}
