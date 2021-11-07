import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../product';
import { getCurrentProduct, State } from '../state';
import { ProductPageActions } from '../state/actions';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  selectedProduct?: Product;
  originalData?: Product;


  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.store.select(getCurrentProduct).subscribe(
      data => {
        if (data) {
          this.originalData = data;
          this.selectedProduct = { ...data };
        }
        else {
          this.originalData = undefined;
          this.selectedProduct = undefined;
        }
      }
    );
  }

  saveProduct() {
    if (this.selectedProduct) {
      this.store.dispatch(
        ProductPageActions.updateProduct({ product: this.selectedProduct }))
    }
  }

  deleteProduct() {
    if (this.selectedProduct) {
      this.store.dispatch(
        ProductPageActions.deleteProduct({ productId: this.selectedProduct.id }))
    }
  }

  revertChanges() {

    if (this.originalData) {
      this.selectedProduct = { ...this.originalData }
    }
    else {
      this.selectedProduct = undefined;
    }
  }
}
