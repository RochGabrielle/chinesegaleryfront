import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DisplayarticleComponent } from './displayarticle.component';

describe('DisplayarticleComponent', () => {
  let component: DisplayarticleComponent;
  let fixture: ComponentFixture<DisplayarticleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayarticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayarticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
