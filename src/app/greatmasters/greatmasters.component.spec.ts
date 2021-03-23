import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GreatmastersComponent } from './greatmasters.component';

describe('GreatmastersComponent', () => {
  let component: GreatmastersComponent;
  let fixture: ComponentFixture<GreatmastersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GreatmastersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreatmastersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
