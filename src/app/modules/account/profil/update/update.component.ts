import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as M from 'materialize-css';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@service/forum/user.service';
import { User } from '@schema/user';
import { CurrentUserService } from '@service/current-user.service';
import { MustMatch } from '@modules/auth/_helpers/must-match.validator';
import { slideToTop } from 'app/layout/animations';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  animations: [
    slideToTop
 ]
})
export class UpdateComponent implements OnInit, AfterViewInit {
  userForm: FormGroup;
  isLoading: boolean = false;
  submitted: boolean = false;
  error: string = null;
  user: User;
  displayForm: boolean;
  
  constructor(private userService: UserService, private formBuilder: FormBuilder, private currentUserService: CurrentUserService) { }

  ngOnInit(): void {
    this.displayForm = false;
    this.userService.get(this.currentUserService.info.id).subscribe((res: any) => {
        this.user = res as User;
        this.buildForm(this.user);
        this.displayForm = true;
        setTimeout(() => {
          M.updateTextFields();
        });
    });
  }

  ngAfterViewInit(): void {
    // M.Datepicker.init(document.querySelectorAll('.datepicker'), {
    //   firstDay: true, 
    //   format: 'yyyy-mm-dd',
    //   min: new Date(1980,1,1),
    //   i18n: {
    //       months: ["Janvier", "Vévr", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    //       monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic"],
    //       weekdays: ["Domingo","Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
    //       weekdaysShort: ["Dom","Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
    //       weekdaysAbbrev: ["D","L", "M", "M", "J", "V", "S"],
    //       cancel: 'Annuler',
    //       done: 'Valider'
    //   }
    // });
  }

  get f () {
    return this.userForm.controls;
  }

  submitForm() {
    if(this.submitted) {
      return;
    }
    this.submitted = true;
    this.isLoading = true;

    let userData = this.userForm.value as User;

    this.userService.updateProfil(userData).subscribe((response: any) => {
      this.validResponse(response);
    }, (error: any) => {
      this.validResponse(error);
    });
  }

  validResponse(response: any) {
    if(response && response.id) {
      let message = 'Votre profil a été modifier avec succès!';
      var toastHTML = '<span>'+ message +'</span><button class="btn-flat toast-action" onclick="M.toast.dismiss();">Fermer</button>';
      M.toast({html: toastHTML});
    } else {
      this.error = 'Un utilisateur avec le même adresse email existe déjà!';
    }
    this.submitted = false;
    this.isLoading = false;
  }

  private buildForm(user: User): void {
    console.log(user);
    this.userForm = this.formBuilder.group({
      firstName: [user.firstName, Validators.required],
      lastName: [user.lastName, Validators.required],
      email: [user.email, [Validators.required, Validators.email]],
      username: [user.username, [Validators.required]],
      sex: [(user.sex && user.sex === 'H') ? true : false],
      age: [user.age, [Validators.pattern('[0-9]*'), Validators.min(10), Validators. max(100)]],
      phone: [user.phone],
      password: ['', [Validators.minLength(6)]],
      confirmPassword: ['']
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }
}
