import { User } from '@schema/user';
import { AuthenticationService } from '@service/authentication.service';
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
  user: User = null;
  authenticate = false;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    if(this.authenticationService.currentUserValue) {
      this.user = this.authenticationService.currentUserValue;
      console.log(this.user);
      this.authenticate = true;
    }
  }

  ngAfterViewInit(): void {
    M.Sidenav.init(
      document.querySelectorAll('.sidenav'),
      this.optionsSidenav
    );

    M.Modal.init(
      document.querySelectorAll('.modal'),
      {}
    );

    M.Dropdown.init(
      document.querySelectorAll('.dropdown-trigger'),
      {}
    );
  }

}
