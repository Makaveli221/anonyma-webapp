import { AuthenticationService } from '@service/authentication.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorsMessage } from 'app/data/constants/errors-messge';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.scss']
})
export class PageLoginComponent implements OnInit {
  error: string;
  isLoading: boolean;
  submitted = false;
  loginForm: FormGroup;
  pwdToogled = false;
  returnUrl: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    // get return url from route parameters or default to '/accueil'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/accueil';
    
    // redirect to accueil if already sign in
    if (this.authenticationService.getToken() && !this.authenticationService.isExpired()) {
      this.router.navigate([this.returnUrl]);
    }

    this.buildForm();
  }

  get f () {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;
    this.isLoading = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.authenticationService.signIn(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
          data => {
              this.router.navigate([this.returnUrl]);
          },
          error => {
            if(error.status === 401) {
              this.error = 'Login ou mot de passe incorrecte.'
            } else {
              this.error = ErrorsMessage.InternalServerError;
            }
              this.isLoading = false;
          });

  }

  private buildForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

}
