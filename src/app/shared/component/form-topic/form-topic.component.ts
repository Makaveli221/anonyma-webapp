import { Subject } from '@schema/subject';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '@service/authentication.service';

@Component({
  selector: 'app-form-topic',
  templateUrl: './form-topic.component.html',
  styleUrls: ['./form-topic.component.scss']
})
export class FormTopicComponent implements OnInit {
  error: string;
  isLoading: boolean;
  submitted = false;
  topicForm: FormGroup;
  @Input() subject: Subject[];

  constructor(private authenticationService: AuthenticationService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    console.log('i\'m her!')
    this.buildForm();
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

    console.log(this.topicForm.value);
  }

  private buildForm(): void {
    this.topicForm = this.formBuilder.group({
      forum: ['', Validators.required],
      subject: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      data: ['', [Validators.required]],
      keywords: ['', [Validators.required]],
      imgDefault: ['']
    });
  }
}
