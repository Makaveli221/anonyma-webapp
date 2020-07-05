import { Component, OnInit } from '@angular/core';
import { slideToTop } from 'app/layout/animations';
import { MessageService } from '@service/forum/message.service';
import { Message } from '@schema/message';
import * as M from 'materialize-css';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-list-history',
  templateUrl: './list-history.component.html',
  styleUrls: ['./list-history.component.scss'],
  animations: [
    slideToTop
 ]
})
export class ListHistoryComponent implements OnInit {
  histoires: Message[];
  histoire: Message;
  modal: any;
  headerModal: string;
  error: string;
  isLoading: boolean;
  submitted = false;
  histoireForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private messageService: MessageService) { }

  ngOnInit(): void {
    this.histoires = [];
    this.messageService.allHistory().subscribe((res: any) => {
      console.log(res);
      this.histoires = res as Message[];
      this.initModal();
    });
    this.buildForm(this.histoire);
  }

  initModal() {
    M.Modal.init(document.querySelectorAll('.modal'), {
      onOpenStart: (mod: HTMLElement, btn: HTMLElement) => {
        this.headerModal = 'Ajout d\'une nouvelle histoire';
        if(btn.getAttribute('data-histoire')) {
          const foundIndex = this.histoires.findIndex(x => x.id === btn.getAttribute('data-histoire'));
          this.histoire = this.histoires[foundIndex];
          this.headerModal = 'Modification d\'une histoire';
        }
        this.buildForm(this.histoire);
      },
      onCloseStart: () => {
        this.histoire = null;
      }
    });
    this.modal = M.Modal.getInstance(document.querySelector('.modal'));
  }

  get f () {
    return this.histoireForm.controls;
  }

  private buildForm(mess?: Message): void {
    let objectForm = {
      id: [mess ? mess.id : null],
      type: ['history'],
      email: [mess ? mess.email : '', Validators.required],
      texte: [mess ? mess.texte : '', Validators.required],
      response: [mess ? mess.response : '', Validators.required],
      validate: [mess ? mess.validate : false],
      published: [mess ? mess.published : false]
    }
    this.histoireForm = this.formBuilder.group(objectForm);
    setTimeout(() => {
      M.textareaAutoResize(document.querySelector('#texte'));
      M.textareaAutoResize(document.querySelector('#response'));
    });
  }

  submitForm() {
    if(this.submitted) {
      return;
    }
    this.submitted = true;
    this.isLoading = true;

    this.histoire = this.histoireForm.value as Message;

    if(this.histoire.id) {
      this.messageService.update(this.histoire.id, this.histoire).subscribe((response: any) => {
        this.validResponse(response, 'update');
      }, (error: any) => {
        this.validResponse(error, 'update');
      });
    } else {
      this.messageService.create(this.histoire).subscribe((response: any) => {
        this.validResponse(response, 'create');
      }, (error: any) => {
        this.validResponse(error, 'create');
      });
    }
  }

  validResponse(response: any, action: string) {
    if(response && response.id) {
      let message = 'Nouvele histoire ajoutée avec succès!';
      if (action === 'update') {
        const foundIndex = this.histoires.findIndex(x => x.id === response.id);
        this.histoires[foundIndex] = response as Message;
        message = 'Histoire modifié avec succès!';
      } else {
        this.histoires.unshift(response as Message);
      }
      this.modal.close();
      var toastHTML = '<span>'+ message +'</span><button class="btn-flat toast-action" onclick="M.toast.dismiss();">Fermer</button>';
      M.toast({html: toastHTML});
    } else {
      this.error = 'La taille de la photo que vous venez de charger est trop gros';
    }
    this.submitted = false;
    this.isLoading = false;
  }
}
