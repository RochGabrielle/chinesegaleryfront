import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportArtistsComponent } from './import-artists.component';

describe('ImportArtistsComponent', () => {
  let component: ImportArtistsComponent;
  let fixture: ComponentFixture<ImportArtistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportArtistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportArtistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
