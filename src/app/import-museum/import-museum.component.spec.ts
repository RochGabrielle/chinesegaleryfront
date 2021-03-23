import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ImportMuseumComponent } from './import-museum.component';

describe('ImportMuseumComponent', () => {
  let component: ImportMuseumComponent;
  let fixture: ComponentFixture<ImportMuseumComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportMuseumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportMuseumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
