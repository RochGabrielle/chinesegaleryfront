import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SimpletranslationlistComponent } from './simpletranslationlist.component';

describe('SimpletranslationlistComponent', () => {
  let component: SimpletranslationlistComponent;
  let fixture: ComponentFixture<SimpletranslationlistComponent>;

  beforeEach(waitForAsync(() => {
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
