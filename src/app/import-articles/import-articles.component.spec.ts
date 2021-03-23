import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ImportArticlesComponent } from './import-articles.component';

describe('ImportArticlesComponent', () => {
  let component: ImportArticlesComponent;
  let fixture: ComponentFixture<ImportArticlesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportArticlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
