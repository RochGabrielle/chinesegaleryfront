import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryhighlightsComponent } from './galleryhighlights.component';

describe('GalleryhighlightsComponent', () => {
  let component: GalleryhighlightsComponent;
  let fixture: ComponentFixture<GalleryhighlightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryhighlightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryhighlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
