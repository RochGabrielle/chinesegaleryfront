import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsimpletranslationComponent } from './editsimpletranslation.component';

describe('EditsimpletranslationComponent', () => {
  let component: EditsimpletranslationComponent;
  let fixture: ComponentFixture<EditsimpletranslationComponent>;

  beforeEach(async(() => {
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
