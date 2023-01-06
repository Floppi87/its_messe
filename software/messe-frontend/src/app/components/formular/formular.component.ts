import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { AdressFragment, PersonalFragment, Product, RegisterPhase } from 'src/app/types/data';

@Component({
  selector: 'its-formular-old',
  templateUrl: './formular.component.html',
  styleUrls: ['./formular.component.css']
})
export class FormularComponent implements OnInit {

  currentPhase: RegisterPhase;

  personData: PersonalFragment | undefined;
  adressData: AdressFragment | undefined;
  webcamImg: string | undefined;
  company: string | undefined;
  products: Product[] | undefined;

  globalData: any;

  constructor(private rest: RestService) {
    this.currentPhase = RegisterPhase.Personal;
  }

  ngOnInit(): void {
  }

  onResult(phase: number, event: any) {
    switch(phase) {
      case RegisterPhase.Personal:
        this.personData = <PersonalFragment>event;
        break;
      case RegisterPhase.PersonalAdress:
        this.adressData = <AdressFragment>event;
        break;
      case RegisterPhase.Webcam:
        this.webcamImg = <string>event;
        break;
      case RegisterPhase.Company:
        this.company = <string>event;
        break;
      case RegisterPhase.Interest:
        this.products = <Product[]>event;
        break;
    }

    if(this.personData && this.adressData && this.webcamImg && this.company && this.products) {
      console.log("Ready to register");
      let data = Object.assign(this.personData, {
        adress: this.adressData,
        picture: this.webcamImg,
        company: {
          id: 0,  // TODO Remove in Backend
          name: this.company
        },
        interests: this.products
      })

      this.globalData = data;
      console.log(data)
      this.currentPhase = RegisterPhase.Finished;
    } else {
      this.switchPhase();
    }
  }


  switchPhase() {
    if(!this.personData) {
      this.currentPhase = RegisterPhase.Personal
    } else if(!this.adressData) {
      this.currentPhase = RegisterPhase.PersonalAdress
    } else if(!this.webcamImg) {
      this.currentPhase = RegisterPhase.Webcam
    } else if(!this.company) {
      this.currentPhase = RegisterPhase.Company
    } else if(!this.products) {
      this.currentPhase = RegisterPhase.Interest
    }
  }

  onControl(event: any) {
    
  }
}
