import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';

import * as M from 'materialize-css';

import { TypeSubject } from '@schema/type-subject';
import { Subject } from '@schema/subject';
import { SubjectService } from '@service/forum/subject.service';

@Component({
  selector: 'app-form-subject',
  templateUrl: './form-subject.component.html',
  styleUrls: ['./form-subject.component.scss']
})
export class FormSubjectComponent implements OnInit, OnChanges {
  error: string;
  isLoading: boolean;
  isEditing: boolean;
  submitted = false;
  subjectForm: FormGroup;
  elChips: any[];
  @Input() activeSubmit: boolean;
  @Input() typeSubject: TypeSubject;
  @Input() subject: Subject;
  @Output() readonly formSubmit: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('subjectFormElem') subjectFormElem: FormGroupDirective; 


  constructor(
    private formBuilder: FormBuilder,
    private subjectService: SubjectService
  ) { }

  ngOnInit(): void {
    this.submitted = false;
    this.isLoading = false;
    this.isEditing = false;
    if(this.subject && this.subject.id) {
      this.isEditing = true;
    } else {
      this.subject = new Subject();
    }
    this.buildForm(this.subject);
    let dataChips = [];
    if (this.subject && this.subject.keywords) {
      this.subject.keywords.forEach((d: string) => dataChips.push({tag: d}))
    }
    this.elChips = M.Chips.init(document.querySelectorAll('.chips'), {
      data: dataChips,
      placeholder: 'Ajouter mots clés',
      secondaryPlaceholder: '+ Ajouter',
      limit: 7
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    setTimeout(()=>{
      if (changes.activeSubmit.currentValue === true && !this.subjectForm.invalid) {
        this.subjectFormElem.ngSubmit.emit();
      }
    })
	}

  get f () {
    return this.subjectForm.controls;
  }

  submitForm() {
    if(this.submitted) {
      return;
    }
    this.submitted = true;
    this.isLoading = true;

    // stop here if form is invalid
    if (this.subjectForm.invalid) {
      return;
    }

    this.subjectForm.value.status = +this.subjectForm.value.status;

    this.subjectForm.value.keywords = this.elChips[0].chipsData.reduce((accumulator, currentValue) => {
      accumulator.push(currentValue.tag);
      return accumulator;
    },[]);

    Object.assign(this.subject, this.subjectForm.value);
    this.subject.typeSubject = this.typeSubject.id;

    if(this.isEditing) {
      this.subjectService.update(this.subject.key, this.subject).subscribe((response: any) => {
        if(response && response.id) {
          this.formSubmit.emit(response);
        } else {
          this.formSubmit.emit(false);
        }
      });
    } else {
      this.subjectService.create(this.subject).subscribe((response: any) => {
        if(response && response.id) {
          this.formSubmit.emit(response);
        } else {
          this.formSubmit.emit(false);
        }
      });
    }
  }

  private buildForm(sub?: Subject): void {
    this.subjectForm = this.formBuilder.group({
      title: [sub ? sub.title : '', Validators.required],
      description: [sub ? sub.description : '', Validators.required],
      keywords: ['', sub ? [] : [Validators.required]],
      status: [sub ? sub.status : true],
    });
  }

}
