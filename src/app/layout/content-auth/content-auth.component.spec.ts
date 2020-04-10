import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentAuthComponent } from './content-auth.component';

describe('ContentAuthComponent', () => {
  let component: ContentAuthComponent;
  let fixture: ComponentFixture<ContentAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
