import { TypeSubject } from '@schema/type-subject';
import { SubjectService } from '@service/forum/subject.service';
import { Subject } from '@schema/subject';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { slideToTop } from 'app/layout/animations';

import * as M from 'materialize-css';

@Component({
  selector: 'app-list-forum',
  templateUrl: './list-forum.component.html',
  styleUrls: ['./list-forum.component.scss'],
  animations: [
    slideToTop
 ]
})
export class ListForumComponent implements OnInit {
  subjects: Subject[];
  typeSubject: TypeSubject;
  newSubject: Subject;
  modal: any;
  pager: any = {};
  initialPage: number;
  formSubjectActive = false;

  constructor(private route: ActivatedRoute, private subjectService: SubjectService) { }

  ngOnInit(): void {
    this.initialPage = 1;
    this.route.queryParams.subscribe(x => this.loadPage(x.page || this.initialPage));
    M.Modal.init(document.querySelectorAll('.modal'), {
      onOpenStart: (mod: HTMLElement, btn: HTMLElement) => {
        if(btn.getAttribute('data-subject')) {
          const foundIndex = this.subjects.findIndex(x => x.key === btn.getAttribute('data-subject'));
          this.newSubject = this.subjects[foundIndex];
        }
        this.formSubjectActive = true;
      },
      onCloseStart: () => {
        this.formSubjectActive = false;
      }
    });
    this.modal = M.Modal.getInstance(document.querySelector('.modal'));
  }

  loadPage(page: number) {
    this.subjectService.getAllByType('forums', page).subscribe(
      (response: any) => {
        if(response && response.content && response.content.length > 0) {
          const pages = [...Array(response.totalPages + 1).keys()];
          pages.shift();

          this.subjects = response.content as Subject[];
          this.typeSubject = this.subjects[0].typeSubject as TypeSubject;

          this.pager.current = response.number + 1;
          this.pager.first = response.first;
          this.pager.last = response.last;
          this.pager.pages = pages;
        }
      }
    )
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
    }
  }

}
