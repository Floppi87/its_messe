import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { PersonData } from 'src/app/types/data';
import { WebcamComponent } from './webcam/webcam.component';

@Component({
  selector: 'its-formular',
  templateUrl: './formular.component.html',
  styleUrls: ['./formular.component.css']
})
export class FormularComponent implements OnInit {

  webcamImg: string = ""

  counter: number = 0;
  constructor(private rest: RestService) { }

  ngOnInit(): void {
    setInterval(()=>{
      this.counter++;
    }, 1000)
  }

  sendExample() {
    if(this.webcamImg == "") {
      console.log("IMG empty")
      return;
    }
    console.log("Sending...")
    let example: PersonData = {
      surname: "Kadabra", 
      firstname: "Abra",
      email: "abra@kadabra.de",
      phone: "07331",
      adress: {
        plz: 73312,
        city: "Seitsada",
        country: "Deutschland",
        street: "hesstraße",
        houseNr: "31"
      },
      picture: this.webcamImg
    }
    this.rest.registerCustomer(example)
  }


}
