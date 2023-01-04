import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalAdressFormComponent } from './personal-adress-form.component';

describe('PersonalAdressFormComponent', () => {
  let component: PersonalAdressFormComponent;
  let fixture: ComponentFixture<PersonalAdressFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalAdressFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalAdressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
