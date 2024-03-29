import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ArtistprofileComponent } from './artistprofile.component';

describe('ArtistprofileComponent', () => {
  let component: ArtistprofileComponent;
  let fixture: ComponentFixture<ArtistprofileComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
