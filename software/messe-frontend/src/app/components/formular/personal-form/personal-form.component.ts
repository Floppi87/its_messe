import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ControlAction, PersonalFragment } from 'src/app/types/data';

@Component({
  selector: 'its-personal-form',
  templateUrl: './personal-form.component.html',
  styleUrls: ['./personal-form.component.css']
})
export class PersonalFormComponent implements OnInit {

  @Output("result") result = new EventEmitter<PersonalFragment>();
  constructor() { }

  ngOnInit(): void {
  }

  prepareFragment() {
    let surnameElem = <HTMLInputElement>document.querySelector("#surname");
    let firstnameElem = <HTMLInputElement>document.querySelector("#firstname");
    let emailElem = <HTMLInputElement>document.querySelector("#email");
    let phoneElem = <HTMLInputElement>document.querySelector("#phone");

    if(surnameElem.value && firstnameElem.value && emailElem.value) {
      this.result.emit({
        surname: surnameElem.value,
        firstname: firstnameElem.value,
        email: emailElem.value,
        phone: phoneElem.value ? phoneElem.value : ""
      });
      surnameElem.style.backgroundColor = "initial";
      firstnameElem.style.backgroundColor = "initial";
      emailElem.style.backgroundColor = "initial";
    } else {
      if(!surnameElem.value) {
        surnameElem.style.backgroundColor = "lightcoral";
      }
      if(!firstnameElem.value) {
        firstnameElem.style.backgroundColor = "lightcoral";
      }
      if(!emailElem.value) {
        emailElem.style.backgroundColor = "lightcoral";
      }
    }
  }

  onControl(event: any) {
    let action = <ControlAction>event;
    if(action == ControlAction.Next) {
      this.prepareFragment();
    }
  }
}
