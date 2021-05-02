import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayArtistGalleryComponent } from './display-artist-gallery.component';

describe('DisplayArtistGalleryComponent', () => {
  let component: DisplayArtistGalleryComponent;
  let fixture: ComponentFixture<DisplayArtistGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayArtistGalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayArtistGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
