import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GreatmastersComponent } from './greatmasters.component';

describe('GreatmastersComponent', () => {
  let component: GreatmastersComponent;
  let fixture: ComponentFixture<GreatmastersComponent>;

  beforeEach(async(() => {
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
