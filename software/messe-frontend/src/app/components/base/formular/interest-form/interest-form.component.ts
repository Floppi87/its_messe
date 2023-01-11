import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { RestService } from 'src/app/services/rest.service';
import { ControlAction, Product } from 'src/app/types/data';

@Component({
  selector: 'its-interest-form',
  templateUrl: './interest-form.component.html',
  styleUrls: ['./interest-form.component.css']
})
export class InterestFormComponent implements OnInit {

  @Output("result") result = new EventEmitter<Product[]>(); // Output to transfer data to parent component

  products: Product[] = [];
  selectedIDs: Product[] = [];

  constructor(private rest: RestService) {

    // Getting Product list from backend service 
    this.rest.getProducts().pipe(catchError(err => {
      // on error
      window.alert("Fehler beim Laden der Produktgruppen")
      return throwError(() => new Error());
    })).subscribe(resp => {
      this.products = <Product[]>resp
    })
  }

  ngOnInit(): void {
  }

  /* Gets triggered on change and updates list of selected items */
  onChange(product: Product) {
    let found = false;
    for(let i = 0; i< this.selectedIDs.length; i++) {
      if(this.selectedIDs[i].id === product.id) {
        this.selectedIDs.splice(i, 1);
        found = true;
        break;
      }
    }
    if(!found) {
      this.selectedIDs.push(product)
    }

    this.result.emit(this.selectedIDs)
  }

  // Deprecated function for external triggered data transfer, for example a button
  prepareFragment() {
    if(this.selectedIDs.length > 0) {
      this.result.emit(this.selectedIDs);
    }
  }

  
  onControl(event: any) {
    let action = <ControlAction>event;
    if(action == ControlAction.Next) {
      this.prepareFragment();
    }
  }

}
