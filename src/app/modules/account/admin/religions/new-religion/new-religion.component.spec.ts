import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReligionComponent } from './new-religion.component';

describe('NewReligionComponent', () => {
  let component: NewReligionComponent;
  let fixture: ComponentFixture<NewReligionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewReligionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewReligionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
