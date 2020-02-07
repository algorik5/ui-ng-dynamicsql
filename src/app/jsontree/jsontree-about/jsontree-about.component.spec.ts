import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsontreeAboutComponent } from './jsontree-about.component';

describe('JsontreeAboutComponent', () => {
  let component: JsontreeAboutComponent;
  let fixture: ComponentFixture<JsontreeAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsontreeAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsontreeAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
