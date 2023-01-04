import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ControlAction } from 'src/app/types/data';

@Component({
  selector: 'its-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.css']
})
export class FormControlComponent implements OnInit {

  @Output("action") action = new EventEmitter<ControlAction>();
  constructor() { }

  ngOnInit(): void {
  }

  onPressed(action: ControlAction) {
    this.action.emit(action);
  }

}
