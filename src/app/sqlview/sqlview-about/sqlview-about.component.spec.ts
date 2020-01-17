import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SqlviewAboutComponent } from './sqlview-about.component';

describe('SqlviewAboutComponent', () => {
  let component: SqlviewAboutComponent;
  let fixture: ComponentFixture<SqlviewAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SqlviewAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SqlviewAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
