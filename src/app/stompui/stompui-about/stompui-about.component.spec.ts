import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StompuiAboutComponent } from './stompui-about.component';

describe('StompuiAboutComponent', () => {
  let component: StompuiAboutComponent;
  let fixture: ComponentFixture<StompuiAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StompuiAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StompuiAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
