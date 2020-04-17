import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTopicComponent } from './form-topic.component';

describe('FormTopicComponent', () => {
  let component: FormTopicComponent;
  let fixture: ComponentFixture<FormTopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
