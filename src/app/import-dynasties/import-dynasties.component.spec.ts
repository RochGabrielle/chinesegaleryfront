import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportDynastiesComponent } from './import-dynasties.component';

describe('ImportDynastiesComponent', () => {
  let component: ImportDynastiesComponent;
  let fixture: ComponentFixture<ImportDynastiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportDynastiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportDynastiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
