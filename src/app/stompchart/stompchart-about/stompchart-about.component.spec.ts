import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StompchartAboutComponent } from './stompchart-about.component';

describe('StompchartAboutComponent', () => {
  let component: StompchartAboutComponent;
  let fixture: ComponentFixture<StompchartAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StompchartAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StompchartAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
