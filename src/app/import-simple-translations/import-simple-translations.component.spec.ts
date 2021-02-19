import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportSimpleTranslationsComponent } from './import-simple-translations.component';

describe('ImportSimpleTranslationsComponent', () => {
  let component: ImportSimpleTranslationsComponent;
  let fixture: ComponentFixture<ImportSimpleTranslationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportSimpleTranslationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportSimpleTranslationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
