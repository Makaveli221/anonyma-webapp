import { AuthenticationService } from '@service/authentication.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorsMessage } from 'app/data/constants/errors-messge';
import { first } from 'rxjs/operators';
import { MustMatch } from '../../_helpers/must-match.validator';
import { User } from '@schema/user';
import { ERoles } from '@schema/eroles';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  error: string;
  isLoading: boolean;
  submitted = false;
  registerForm: FormGroup;
  registered = false;
  returnUrl: string;
  MustMatch

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
    return this.registerForm.controls;
  }

  register() {
    this.submitted = true;
    this.isLoading = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    const newUser: User = this.registerForm.value as User;
    newUser.roles = [ERoles.ROLE_USER];

    this.authenticationService.signUp(newUser)
      .pipe(first())
      .subscribe(
          data => {
            this.error= null;
            this.registered = true;
          },
          error => {
            if(error.status === 400) {
              this.error = error.message
            } else {
              this.error = ErrorsMessage.InternalServerError;
            }
              this.isLoading = false;
          });

  }

  private buildForm(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

}
