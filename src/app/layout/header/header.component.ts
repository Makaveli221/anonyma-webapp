import { User } from '@schema/user';
import { AuthenticationService } from '@service/authentication.service';
import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import * as M from 'materialize-css';
import { Router } from '@angular/router';
import { Roles } from '@schema/roles';


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
  roleName: string = "";
  @Input() account: boolean;
  @Input() toggled: boolean;

  constructor(private authenticationService: AuthenticationService, public router: Router) { }

  ngOnInit(): void {
    if(this.authenticationService.isAuthenticated()) {
      this.user = this.authenticationService.currentUserValue;
      this.authenticate = true;
      this.roleName = this.authenticationService.getRolesName(this.user.roles);
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

  signIn() {
    this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
  }

  signOut(event: Event): void {
    event.preventDefault();
    console.log('singout')
    this.authenticationService.signOut();
    this.router.navigate(['/login']);
  }

}
