import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-layout',
  templateUrl: './account-layout.component.html',
  styleUrls: ['./account-layout.component.scss']
})
export class AccountLayoutComponent implements OnInit {
  toggled = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu() {
    this.toggled = !this.toggled;
  }
}
