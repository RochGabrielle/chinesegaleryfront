import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditSizeCategoryComponent } from './edit-size-category.component';

describe('EditSizeCategoryComponent', () => {
  let component: EditSizeCategoryComponent;
  let fixture: ComponentFixture<EditSizeCategoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSizeCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSizeCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
