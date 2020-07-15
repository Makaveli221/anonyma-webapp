import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCoachingComponent } from './list-coaching.component';

describe('ListCoachingComponent', () => {
  let component: ListCoachingComponent;
  let fixture: ComponentFixture<ListCoachingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCoachingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCoachingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
