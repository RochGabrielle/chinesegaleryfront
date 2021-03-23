import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DynastyComponent } from './dynasty.component';

describe('DynastyComponent', () => {
  let component: DynastyComponent;
  let fixture: ComponentFixture<DynastyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DynastyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynastyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
