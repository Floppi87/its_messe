import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'its-req-star',
  templateUrl: './required-star.component.html',
  styleUrls: ['./required-star.component.css']
})
export class RequiredStarComponent implements OnInit {

  @Input("errMsg") showMsg: boolean;
  constructor() {
    this.showMsg = false;
  }

  ngOnInit(): void {
  }

}
