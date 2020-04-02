import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContentLayoutComponent } from './admin-content-layout.component';

describe('AdminContentLayoutComponent', () => {
  let component: AdminContentLayoutComponent;
  let fixture: ComponentFixture<AdminContentLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminContentLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminContentLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
