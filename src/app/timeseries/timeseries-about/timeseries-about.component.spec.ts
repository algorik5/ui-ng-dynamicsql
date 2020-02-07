import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeseriesAboutComponent } from './timeseries-about.component';

describe('TimeseriesAboutComponent', () => {
  let component: TimeseriesAboutComponent;
  let fixture: ComponentFixture<TimeseriesAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeseriesAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeseriesAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
