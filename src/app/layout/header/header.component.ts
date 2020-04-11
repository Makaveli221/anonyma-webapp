import { User } from '@schema/user';
import { AuthenticationService } from '@service/authentication.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as M from 'materialize-css';
import { Router } from '@angular/router';


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

  constructor(private authenticationService: AuthenticationService, public router: Router) { }

  ngOnInit(): void {
    if(this.authenticationService.currentUserValue) {
      this.user = this.authenticationService.currentUserValue;
      this.authenticate = true;
    }
  }

  ngAfterViewInit(): void {
    M.Sidenav.init(
      document.querySelectorAll('.sidenav'),
      this.optionsSidenav
    );

    M.Dropdown.init(
      document.querySelectorAll('.dropdown-trigger'),
      {}
    );
  }

  getRolesName(roles: string[]) {
    let roleString = 'UTILISATEUR';
    if (roles.indexOf('ROLE_ADMIN') > -1) {
      roleString = 'ADMINISTRATEUR';
    }
    if (roles.indexOf('ROLE_MODERATOR') > -1) {
      roleString = 'MODERATEUR';
    }
    return roleString;
  }

  signOut() {
    if(this.authenticationService.signOut().valueOf()) {
      this.router.navigate(['/login']);
    }
  }

}
