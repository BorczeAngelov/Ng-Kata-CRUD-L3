import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../product';
import { getCurrentProduct, State } from '../state';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  selectedProduct?: Product;


  constructor(private store: Store<State>) { }

  ngOnInit(): void {

    this.store.select(getCurrentProduct).subscribe(
      data => {
        if (data)
          this.selectedProduct = data;
        else
          this.selectedProduct = undefined;
      }
    );
  }

}
