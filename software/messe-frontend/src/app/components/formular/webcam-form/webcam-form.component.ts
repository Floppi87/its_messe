import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ControlAction } from 'src/app/types/data';

@Component({
  selector: 'its-webcam-form',
  templateUrl: './webcam-form.component.html',
  styleUrls: ['./webcam-form.component.css']
})
export class WebcamFormComponent implements OnInit {

  
  @Output("result") result = new EventEmitter<string>();
  webcamImg: string = ""
  constructor() { }

  ngOnInit(): void {
  }


  setImg(event: string) {
    this.webcamImg = event;
  }

  onControl(event: ControlAction) {
    if(event === ControlAction.Next) {
      this.result.emit(this.webcamImg);
    }
  }
}
