import { Injectable } from '@angular/core';
import { User } from '../schema/user';
import { Roles } from '@schema/roles';
import { UserService } from './forum/user.service';


@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  private _currentUser: User;

  constructor(private userService: UserService) {
    this.userService.get('sdsds').subscribe(user => this._currentUser = user as User);
  }

  public get info() : any {
    return this._currentUser;
  }

  public get roles() : string[] {
    return this._currentUser.roles;
  }

  public get isAdmin() {
    return this._currentUser && (this._currentUser.roles.find(role => role.name === Roles.ROLE_ADMIN)).length > 0;
  }

  public get isModerator() {
    return this._currentUser && (this._currentUser.roles.find(role => role.name === Roles.ROLE_MODERATOR)).length > 0;
  }

  public get isUser() {
    return this._currentUser && (this._currentUser.roles.find(role => role.name === Roles.ROLE_USER)).length > 0;
  }
}
