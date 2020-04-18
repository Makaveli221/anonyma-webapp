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
  @Input() topic: Topic;
  @Output() readonly formSubmit: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private subjectService: SubjectService,
    private topicService: TopicService
  ) { }

  ngOnInit(): void {
    this.buildForm(this.topic);
  }

  ngAfterViewInit(): void {
    this.subjectService.all(0, -1).subscribe(
      (response: any) => {
        if(response && response.content && response.content.length > 0) {
          this.subjects = response.content as Subject[];
          setTimeout(() => {
            M.FormSelect.init(document.querySelectorAll('select'),{});
            this.elChips = M.Chips.init(document.querySelectorAll('.chips'), {
              placeholder: 'Ajouter mots clés',
              secondaryPlaceholder: '+ Ajouter',
              limit: 3
            });
          }, 0);
        }
      }
    )
  }

  get f () {
    return this.topicForm.controls;
  }

  submitForm() {
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

    this.topicForm.value.status = +this.topicForm.value.status;

    this.topicForm.value.keywords = this.elChips[0].chipsData.reduce((accumulator, currentValue) => {
      accumulator.push(currentValue.tag);
      return accumulator;
    },[]);

    formData.append('info', JSON.stringify(this.topicForm.value));

    this.topicService.create(formData).subscribe((response: any) => {
      if(response && response.id) {
        this.formSubmit.emit(true);
      } else {
        this.formSubmit.emit(false);
      }
    })
  }

  private buildForm(top?: Topic): void {
    this.topicForm = this.formBuilder.group({
      subject: [top ? (top.subject as Subject).id : '', Validators.required],
      title: [top ? top.title : '', Validators.required],
      description: [top ? top.description : '', Validators.required],
      keywords: [top ? top.keywords : '', [Validators.required]],
      status: [top ? top.status : true],
      data: [top ? top.data : '<p>Votre sujet...</p>', [Validators.required]],
      imgDefault: [top ? top.imgDefault : '']
    });
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    let file: File = fileList[0];
    this.uploadFile = file;
  }
}
