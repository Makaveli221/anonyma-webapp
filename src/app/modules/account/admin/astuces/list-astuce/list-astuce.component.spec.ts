import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAstuceComponent } from './list-astuce.component';

describe('ListAstuceComponent', () => {
  let component: ListAstuceComponent;
  let fixture: ComponentFixture<ListAstuceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAstuceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAstuceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
