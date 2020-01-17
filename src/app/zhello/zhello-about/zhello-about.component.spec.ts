import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZhelloAboutComponent } from './zhello-about.component';

describe('ZhelloAboutComponent', () => {
  let component: ZhelloAboutComponent;
  let fixture: ComponentFixture<ZhelloAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZhelloAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZhelloAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
