import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditArtistComponent } from './edit-artist.component';

describe('EditArtistComponent', () => {
  let component: EditArtistComponent;
  let fixture: ComponentFixture<EditArtistComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditArtistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
