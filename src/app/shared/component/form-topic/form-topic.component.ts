import { Component, OnInit, AfterViewInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as M from 'materialize-css';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { Subject } from '@schema/subject';
import { SubjectService } from '@service/forum/subject.service';
import { Topic } from '@schema/topic';
import { TopicService } from '@service/forum/topic.service';

@Component({
  selector: 'app-form-topic',
  templateUrl: './form-topic.component.html',
  styleUrls: ['./form-topic.component.scss']
})
export class FormTopicComponent implements OnInit, AfterViewInit {
  error: string;
  isLoading: boolean;
  submitted = false;
  topicForm: FormGroup;
  subjects: Subject[];
  elChips: any[];
  uploadFile: File;
  Editor = ClassicEditor;
  @Input() idSubject: string;
  @Input() topic: Topic;
  @Output() readonly formSubmit: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private subjectService: SubjectService,
    private topicService: TopicService
  ) { }

  ngOnInit(): void {
    this.submitted = false;
    this.isLoading = false;
    this.buildForm(this.topic);
  }

  ngAfterViewInit(): void {
    if(this.idSubject) {
      this.setDataShips();
    } else {
      this.subjectService.getByPublicType(1).subscribe(
        (response: any) => {
          if(response && response.length > 0) {
            this.subjects = response as Subject[];
            this.setDataShips();
          }
        }
      )
    }
  }

  get f () {
    return this.topicForm.controls;
  }

  submitForm() {
    if(this.submitted) {
      return;
    }
    this.submitted = true;
    this.isLoading = true;

    // stop here if form is invalid
    if (this.topicForm.invalid) {
      return;
    }
    const formData = new FormData();

    if(this.uploadFile) {
      formData.append('uploadFile', this.uploadFile, this.uploadFile.name);
    }

    if(this.idSubject) {
      this.topicForm.value.subject = this.idSubject;
    }

    this.topicForm.value.status = +this.topicForm.value.status;

    this.topicForm.value.keywords = this.elChips[0].chipsData.reduce((accumulator, currentValue) => {
      accumulator.push(currentValue.tag);
      return accumulator;
    },[]);

    formData.append('info', JSON.stringify(this.topicForm.value));
    if(this.topic) {
      this.topicService.update(this.topic.key, formData).subscribe((response: any) => {
        this.validResponse(response);
      }, (error: any) => {
        this.validResponse(error);
      });
    } else {
      this.topicService.create(formData).subscribe((response: any) => {
        this.validResponse(response);
      }, (error: any) => {
        this.validResponse(error);
      });
    }
  }

  validResponse(response: any) {
    if(response && response.id) {
      this.formSubmit.emit(true);
    } else {
      this.submitted = false;
      this.isLoading = false;
      this.error = 'La taille de la photo que vous venez de charger est trop gros';
      this.formSubmit.emit(false);
    }
  }

  private buildForm(top?: Topic): void {
    let objectForm = {
      subject: [top ? (top.subject as Subject).id : '', Validators.required],
      title: [top ? top.title : '', Validators.required],
      description: [top ? top.description : '', Validators.required],
      keywords: ['', top ? [] : [Validators.required]],
      status: [top ? top.status : true],
      data: [top ? top.data : '<p>Votre thématique...</p>', [Validators.required]],
      imgDefault: ['']
    }
    if (this.idSubject) {
      objectForm.subject = [this.idSubject, Validators.required]
    }
    this.topicForm = this.formBuilder.group(objectForm);
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    let file: File = fileList[0];
    this.uploadFile = file;
  }

  setDataShips() {
    let dataChips = [];
    if (this.topic && this.topic.keywords) {
      this.topic.keywords.forEach((d: string) => dataChips.push({tag: d}))
    }
    setTimeout(() => {
      M.FormSelect.init(document.querySelectorAll('select'),{});
      this.elChips = M.Chips.init(document.querySelectorAll('.chips'), {
        data: dataChips,
        placeholder: 'Ajouter mots clés',
        secondaryPlaceholder: '+ Ajouter',
        limit: 7
      });
    }, 0);
  }
}
