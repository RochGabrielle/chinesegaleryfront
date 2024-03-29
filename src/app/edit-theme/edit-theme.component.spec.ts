import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditThemeComponent } from './edit-theme.component';

describe('EditThemeComponent', () => {
  let component: EditThemeComponent;
  let fixture: ComponentFixture<EditThemeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditThemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
