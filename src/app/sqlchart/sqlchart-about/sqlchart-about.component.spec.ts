import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SqlchartAboutComponent } from './sqlchart-about.component';

describe('SqlchartAboutComponent', () => {
  let component: SqlchartAboutComponent;
  let fixture: ComponentFixture<SqlchartAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SqlchartAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SqlchartAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
