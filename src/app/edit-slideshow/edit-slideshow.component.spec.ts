import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditSlideshowComponent } from './edit-slideshow.component';

describe('EditSlideshowComponent', () => {
  let component: EditSlideshowComponent;
  let fixture: ComponentFixture<EditSlideshowComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSlideshowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSlideshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
