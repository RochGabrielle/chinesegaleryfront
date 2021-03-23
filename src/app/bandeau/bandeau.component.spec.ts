import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BandeauComponent } from './bandeau.component';

describe('BandeauComponent', () => {
  let component: BandeauComponent;
  let fixture: ComponentFixture<BandeauComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BandeauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandeauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
