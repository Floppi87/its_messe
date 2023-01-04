import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ControlAction } from 'src/app/types/data';

@Component({
  selector: 'its-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent implements OnInit {

  
  @Output("result") result = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  prepareFragment() {
    let nameElem = <HTMLInputElement>document.querySelector("#name");

    if(nameElem.value) {
      this.result.emit(nameElem.value);
      nameElem.style.backgroundColor = "initial";
    } else {
      if(!nameElem.value) {
        nameElem.style.backgroundColor = "lightcoral";
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
