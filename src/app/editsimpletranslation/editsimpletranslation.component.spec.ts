import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditsimpletranslationComponent } from './editsimpletranslation.component';

describe('EditsimpletranslationComponent', () => {
  let component: EditsimpletranslationComponent;
  let fixture: ComponentFixture<EditsimpletranslationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditsimpletranslationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditsimpletranslationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
