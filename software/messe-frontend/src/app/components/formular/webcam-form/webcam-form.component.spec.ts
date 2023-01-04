import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebcamFormComponent } from './webcam-form.component';

describe('WebcamFormComponent', () => {
  let component: WebcamFormComponent;
  let fixture: ComponentFixture<WebcamFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebcamFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
