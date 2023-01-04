import { Component, Input, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'its-finished-form',
  templateUrl: './finished-form.component.html',
  styleUrls: ['./finished-form.component.css']
})
export class FinishedFormComponent implements OnInit {

  data!: any;
  text: string = "";
  constructor(private rest: RestService) { }

  ngOnInit(): void {
  }

  @Input("data") set setData(data: any) {
    this.data = data;
    this.text = JSON.stringify(data, null, 2)
  }


  register() {
    this.rest.registerCustomer(this.data);
  }
}
