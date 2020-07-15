import { Injectable } from '@angular/core';
import { User } from '../schema/user';
import { Roles } from '@schema/roles';


@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  private _currentUser: User;

  constructor() {
    this._currentUser = JSON.parse(localStorage.getItem('currentUser')) as User;
  }

  public get info() : any {
    return this._currentUser;
  }

  public get roles() : string[] {
    return this._currentUser.roles;
  }

  public get isAdmin() {
    return this._currentUser && this._currentUser.roles.indexOf(Roles.ROLE_ADMIN) > -1;
  }

  public get isModerator() {
    return this._currentUser && this._currentUser.roles.indexOf(Roles.ROLE_MODERATOR) > -1;
  }

  public get isUser() {
    return this._currentUser && this._currentUser.roles.indexOf(Roles.ROLE_USER) > -1;
  }
}
