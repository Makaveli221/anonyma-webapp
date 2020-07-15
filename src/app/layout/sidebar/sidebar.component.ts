import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@service/authentication.service';
import { User } from '@schema/user';
import { Router } from '@angular/router';
import { CurrentUserService } from '@service/current-user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  user: User = null;
  authenticate = false;

  constructor(private authenticationService: AuthenticationService, public router: Router, public currentUser: CurrentUserService) { }

  ngOnInit(): void {
    if(this.authenticationService.isAuthenticated()) {
      this.user = this.authenticationService.currentUserValue;
      this.authenticate = true;
    }
  }

  getRolesName(roles: string[]) {
    return this.authenticationService.getRolesName(roles);
  }

  signIn() {
    this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
  }

  signOut() {
    if(this.authenticationService.signOut().valueOf()) {
      this.router.navigate(['/login']);
    }
  }
}
