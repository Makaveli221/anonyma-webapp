import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as M from 'materialize-css';
import { Subject } from '@schema/subject';
import { SubjectService } from '@service/forum/subject.service';
import { slideToTop } from 'app/layout/animations';
import { TypeSubject } from '@schema/type-subject';

@Component({
  selector: 'app-list-astuce',
  templateUrl: './list-astuce.component.html',
  styleUrls: ['./list-astuce.component.scss'],
  animations: [
    slideToTop
 ]
})
export class ListAstuceComponent implements OnInit {
  subjects: Subject[];
  typeSubject: TypeSubject;
  newSubject: Subject;
  modal: any;
  pager: any = {};
  headerModal: string;
  initialPage: number;
  activeSubmit: boolean;
  formSubjectActive = false;

  constructor(private route: ActivatedRoute, private subjectService: SubjectService) { }

  ngOnInit(): void {
    this.activeSubmit = false;
    this.initialPage = 1;
    this.subjects = [];
    this.route.queryParams.subscribe(x => this.loadPage(x.page || this.initialPage));
    M.Modal.init(document.querySelectorAll('.modal'), {
      onOpenStart: (mod: HTMLElement, btn: HTMLElement) => {
        this.headerModal = 'Nouveau rubrique';
        if(btn.getAttribute('data-subject')) {
          const foundIndex = this.subjects.findIndex(x => x.key === btn.getAttribute('data-subject'));
          this.newSubject = this.subjects[foundIndex];
          this.headerModal = 'Modification rubrique '+ this.newSubject.title;
        }
        this.formSubjectActive = true;
      },
      onCloseStart: () => {
        this.formSubjectActive = false;
        this.newSubject = null;
      }
    });
    this.modal = M.Modal.getInstance(document.querySelector('.modal'));
  }

  loadPage(page: number) {
    this.subjectService.getTypeByName('astuces').subscribe((res: any) => {
      if(res && res.id) {
        this.typeSubject = res as TypeSubject;
        this.subjectService.getAllByType(this.typeSubject.name, page).subscribe(
          (response: any) => {
            if(response && response.content && response.content.length > 0) {
              const pages = [...Array(response.totalPages + 1).keys()];
              pages.shift();
              this.subjects = response.content as Subject[];
              this.pager.current = response.number + 1;
              this.pager.first = response.first;
              this.pager.last = response.last;
              this.pager.pages = pages;
            }
          }
        )
      }
    });
  }

  onFormSubmit(response: any): void {
    if (response !== false && response.key) {
      let message = 'Nouveau rubrique ajouté avec succès!';
      if (this.newSubject && this.newSubject.id) {
        const foundIndex = this.subjects.findIndex(x => x.key === response.key);
        this.subjects[foundIndex] = response as Subject;
        message = 'Rubrique modifié avec succès!';
      } else {
        this.subjects.unshift(response as Subject);
      }
      this.modal.close();
      var toastHTML = '<span>'+ message +'</span><button class="btn-flat toast-action" onclick="M.toast.dismiss();">Fermer</button>';
      M.toast({html: toastHTML});
      this.activeSubmit = false;
    }
  }
}
