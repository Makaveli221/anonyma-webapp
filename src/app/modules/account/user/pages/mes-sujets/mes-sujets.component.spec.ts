import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesSujetsComponent } from './mes-sujets.component';

describe('MesSujetsComponent', () => {
  let component: MesSujetsComponent;
  let fixture: ComponentFixture<MesSujetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesSujetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesSujetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
