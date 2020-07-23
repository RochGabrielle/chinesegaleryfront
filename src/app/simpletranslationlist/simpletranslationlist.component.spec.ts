import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpletranslationlistComponent } from './simpletranslationlist.component';

describe('SimpletranslationlistComponent', () => {
  let component: SimpletranslationlistComponent;
  let fixture: ComponentFixture<SimpletranslationlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpletranslationlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpletranslationlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
