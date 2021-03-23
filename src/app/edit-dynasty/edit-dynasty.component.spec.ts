import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditDynastyComponent } from './edit-dynasty.component';

describe('EditDynastyComponent', () => {
  let component: EditDynastyComponent;
  let fixture: ComponentFixture<EditDynastyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDynastyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDynastyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
