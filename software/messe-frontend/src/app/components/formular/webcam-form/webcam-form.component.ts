import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'its-webcam-form',
  templateUrl: './webcam-form.component.html',
  styleUrls: ['./webcam-form.component.css']
})
export class WebcamFormComponent implements OnInit {

  
  webcamImg: string = ""
  constructor() { }

  ngOnInit(): void {
  }

}
