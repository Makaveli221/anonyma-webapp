import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-form-search',
  templateUrl: './form-search.component.html',
  styleUrls: ['./form-search.component.scss']
})
export class FormSearchComponent implements OnInit {
  searchForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
  }

  get f () {
    return this.searchForm.controls;
  }

  private buildForm(): void {
    this.searchForm = this.formBuilder.group({
      question: ['', Validators.required],
      inForums: [false],
      inReligions: [false],
      inAstuces: [false],
    });
  }

  submitForm() {
    // stop here if form is invalid
    if (this.searchForm.invalid) {
      return;
    }
    this.router.navigate(['/search', 'result', `${this.searchForm.value.question}`]);
  }

}
