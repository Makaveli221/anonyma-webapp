import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReligionComponent } from './list-religion.component';

describe('ListReligionComponent', () => {
  let component: ListReligionComponent;
  let fixture: ComponentFixture<ListReligionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListReligionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReligionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
