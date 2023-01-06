import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiredStarComponent } from './required-star.component';

describe('RequiredStarComponent', () => {
  let component: RequiredStarComponent;
  let fixture: ComponentFixture<RequiredStarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequiredStarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequiredStarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
