import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css';
import { slideToTop } from 'app/layout/animations';
import { UserService } from '@service/forum/user.service';
import { User } from '@schema/user';
import { ActivatedRoute } from '@angular/router';
import { Roles } from '@schema/roles';
import { ERoles } from '@schema/eroles';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
  animations: [
    slideToTop
 ]
})
export class ListUserComponent implements OnInit {
  users: User[] = [];
  newUser: User;
  pager: any = {};
  initialPage: number;
  error: string;
  isLoading: boolean;
  submitted = false;
  userForm: FormGroup;
  isUpdating = false;
  modal: any;
  headerModal: string;
  listRoles = [];

  constructor(private route: ActivatedRoute, private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initialPage = 1;
    this.userService.listRoles().subscribe((res: any) => {
      this.listRoles = res;
    })
    this.route.queryParams.subscribe(x => this.loadPage(x.page || this.initialPage));
    this.buildForm();
  }

  loadPage(page: number) {
    this.userService.all(page).subscribe((response: any) => {
      if(response && response.content && response.content.length > 0) {
        const pages = [...Array(response.totalPages + 1).keys()];
        pages.shift();

        this.users = response.content as User[];
        this.pager.current = response.number + 1;
        this.pager.first = response.first;
        this.pager.last = response.last;
        this.pager.pages = pages;
      }
      this.initModal();
    });
  }

  initModal() {
    M.Modal.init(document.querySelectorAll('.modal'), {
      onOpenStart: (mod: HTMLElement, btn: HTMLElement) => {
        this.headerModal = 'Ajout d\'un nouveau utilisateur';
        if(btn.getAttribute('data-user')) {
          const foundIndex = this.users.findIndex(x => x.email === btn.getAttribute('data-user'));
          this.newUser = this.users[foundIndex];
          this.headerModal = 'Modification d\'un utilisateur';
          this.isUpdating = true;
        }
        this.buildForm(this.newUser);
        setTimeout(() => {
          M.FormSelect.init(document.querySelectorAll('select'),{});
        });
      },
      onCloseStart: () => {
        this.newUser = null;
        this.isUpdating = false;
      }
    });
    this.modal = M.Modal.getInstance(document.querySelector('.modal'));
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

    if(this.isUpdating) {
      this.userService.update(this.newUser.id, userData).subscribe((response: any) => {
        this.validResponse(response, 'update');
      }, (error: any) => {
        this.validResponse(error, 'update');
      });
    } else {
      userData.username = userData.email;
      this.userService.create(userData).subscribe((response: any) => {
        this.validResponse(response, 'create');
      }, (error: any) => {
        this.validResponse(error, 'create');
      });
    }
  }

  deleteUser(id) {
    if(confirm("Etes-vous de vouloir supprimer cette utilisateur ?")) {
      this.userService.delete(id).subscribe((res: any) => {
        document.querySelector(`#user-${id}`).remove();
      });
    }
  }

  private buildForm(user?: User): void {
    this.userForm = this.formBuilder.group({
      firstName: [user ? user.firstName : '', Validators.required],
      lastName: [user ? user.lastName : '', Validators.required],
      email: [user ? user.email : '', [Validators.required, Validators.email]],
      username: [user ? user.username : ''],
      phone: [user ? user.phone : '', Validators.required],
      roles: [user ? user.roles.map((r: any) => {return this.setRoleName(r.name)}) : [], Validators.required]
    });
  }

  validResponse(response: any, action: string) {
    if(response && response.id) {
      let message = 'Nouvele utilisateur ajoutée avec succès!';
      if (action === 'update') {
        const foundIndex = this.users.findIndex(x => x.email === response.email);
        this.users[foundIndex] = response as User;
        message = 'Utilisateur modifié avec succès!';
      } else {
        this.users.unshift(response as User);
      }
      this.modal.close();
      var toastHTML = '<span>'+ message +'</span><button class="btn-flat toast-action" onclick="M.toast.dismiss();">Fermer</button>';
      M.toast({html: toastHTML});
    } else {
      this.error = 'Un utilisateur avec le même adresse email existe déjà!';
    }
    this.submitted = false;
    this.isLoading = false;
  }

  isAdmin(role: string) {
    return role === Roles.ROLE_ADMIN;
  }

  isModerator(role: string) {
    return role === Roles.ROLE_MODERATOR;
  }

  isUser(role: string) {
    return role === Roles.ROLE_USER;
  }

  getRoleName(role: string) {
    let roleName = 'Utilisateur';
    if (this.isAdmin(role)) {
      roleName = 'Administrateur';
    }
    if (this.isModerator(role)) {
      roleName = 'Modérateur';
    }
    return roleName;
  }

  setRoleName(role: string) {
    let roleName = ERoles.ROLE_USER;
    if (this.isAdmin(role)) {
      roleName = ERoles.ROLE_ADMIN;
    }
    if (this.isModerator(role)) {
      roleName = ERoles.ROLE_MODERATOR;
    }
    return roleName;
  }
}   
