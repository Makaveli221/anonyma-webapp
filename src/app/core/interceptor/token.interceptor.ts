import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '@service/authentication.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private AUTH_HEADER = 'Authorization';
  private token = '';

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.token = this.authenticationService.getToken();

    if(this.authenticationService.isAuthenticated() && this.authenticationService.isExpired()) {
      this.authenticationService.signOut();
      this.router.navigate(['login']);
      console.log('expired !');
      return;
    }

    if (!req.headers.has('Content-Type')) {
      req = req.clone({
        headers: req.headers.set('Content-Type', 'application/json')
      });
    }

    if (req.headers.get('Content-Type') == 'multipart/form-data;boundary') {
      req = req.clone({
        headers: req.headers.delete('Content-Type')
      });
    }

    req = this.addAuthenticationToken(req);

    return next.handle(req);
  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    // If we do not have a token yet then we should not set the header.
    // Here we could first retrieve the token from where we store it.
    if (!this.token) {
      return request;
    }
    // If you are calling an outside domain then do not add the token.
    /* if (!request.url.match(/www.mydomain.com\//)) {
      console.log('not match');
      return request;
    } */
    return request.clone({
      headers: request.headers.set(this.AUTH_HEADER, "Bearer " + this.token)
    });
  }
}
