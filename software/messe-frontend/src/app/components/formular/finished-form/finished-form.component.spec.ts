import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedFormComponent } from './finished-form.component';

describe('FinishedFormComponent', () => {
  let component: FinishedFormComponent;
  let fixture: ComponentFixture<FinishedFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishedFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
