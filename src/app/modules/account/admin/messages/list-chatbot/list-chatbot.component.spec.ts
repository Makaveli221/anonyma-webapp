import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChatbotComponent } from './list-chatbot.component';

describe('ListChatbotComponent', () => {
  let component: ListChatbotComponent;
  let fixture: ComponentFixture<ListChatbotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListChatbotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListChatbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
