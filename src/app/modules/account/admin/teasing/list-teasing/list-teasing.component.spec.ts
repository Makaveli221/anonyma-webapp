import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTeasingComponent } from './list-teasing.component';

describe('ListTeasingComponent', () => {
  let component: ListTeasingComponent;
  let fixture: ComponentFixture<ListTeasingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTeasingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTeasingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
