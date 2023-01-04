import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { RegisterPhase } from 'src/app/types/data';

@Component({
  selector: 'its-formular',
  templateUrl: './formular.component.html',
  styleUrls: ['./formular.component.css']
})
export class FormularComponent implements OnInit {

  currentPhase: RegisterPhase;

  constructor(private rest: RestService) {
    this.currentPhase = RegisterPhase.Personal;
  }

  ngOnInit(): void {
  }

  onResult(phase: number, event: any) {
    console.log(event);
  }


}
