import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdressFragment, ControlAction } from 'src/app/types/data';

@Component({
  selector: 'its-personal-adress-form',
  templateUrl: './personal-adress-form.component.html',
  styleUrls: ['./personal-adress-form.component.css']
})
export class PersonalAdressFormComponent implements OnInit {

  @Output("result") result = new EventEmitter<AdressFragment>();
  constructor() { }

  ngOnInit(): void {
  }

  prepareFragment() {
    let streetElem = <HTMLInputElement>document.querySelector("#street");
    let houseNr = <HTMLInputElement>document.querySelector("#houseNr");
    let plzElem = <HTMLInputElement>document.querySelector("#plz");
    let cityElem = <HTMLInputElement>document.querySelector("#city");
    let countryElem = <HTMLInputElement>document.querySelector("#country");

    if(streetElem.value && houseNr.value && plzElem.value && cityElem.value && countryElem.value) {
      this.result.emit({
        street: streetElem.value,
        houseNr: houseNr.value,
        plz: parseInt(plzElem.value),
        city: cityElem.value,
        country: countryElem.value
      });
      streetElem.style.backgroundColor = "initial";
      houseNr.style.backgroundColor = "initial";
      plzElem.style.backgroundColor = "initial";
      cityElem.style.backgroundColor = "initial";
      countryElem.style.backgroundColor = "initial";
    } else {
      if(!streetElem.value) {
        streetElem.style.backgroundColor = "lightcoral";
      }
      if(!houseNr.value) {
        houseNr.style.backgroundColor = "lightcoral";
      }
      if(!plzElem.value) {
        plzElem.style.backgroundColor = "lightcoral";
      }
      if(!cityElem.value) {
        cityElem.style.backgroundColor = "lightcoral";
      }
      if(!countryElem.value) {
        countryElem.style.backgroundColor = "lightcoral";
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
