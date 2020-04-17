import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as M from 'materialize-css';

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

  constructor(
    private formBuilder: FormBuilder,
    private subjectService: SubjectService,
    private topicService: TopicService
  ) { }

  ngOnInit(): void {
    this.buildForm();
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

    formData.append('info', new Blob([JSON.stringify(this.topicForm.value)],
    {
      type: "application/json"
    }));

    console.log(this.topicForm.value);
    console.log(formData);
  }

  private buildForm(): void {
    this.topicForm = this.formBuilder.group({
      subject: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      keywords: ['', [Validators.required]],
      status: [true],
      imgDefault: ['']
    });
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    console.log(fileList);
    let file: File = fileList[0];
    this.uploadFile = file;
  }
}
