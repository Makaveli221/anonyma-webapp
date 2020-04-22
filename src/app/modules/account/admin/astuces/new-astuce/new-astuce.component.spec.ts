import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAstuceComponent } from './new-astuce.component';

describe('NewAstuceComponent', () => {
  let component: NewAstuceComponent;
  let fixture: ComponentFixture<NewAstuceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAstuceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAstuceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
