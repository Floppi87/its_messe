import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'its-formular',
  templateUrl: './formular.component.html',
  styleUrls: ['./formular.component.css']
})
export class FormularComponent implements OnInit {

  counter: number = 0;
  constructor() { }

  ngOnInit(): void {
    setInterval(()=>{
      this.counter++;
    }, 1000)
  }
}
