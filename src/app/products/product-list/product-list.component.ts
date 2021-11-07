import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../product';
import { getProducts, State } from '../state';
import { ProductPageActions } from '../state/actions';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products$?: Observable<Product[]>;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.store.dispatch(ProductPageActions.loadProducts());

    this.products$ = this.store.select(getProducts);
  }

  productSelected(product: Product) {
    this.store.dispatch(
      ProductPageActions.setCurrentProduct({ currentProductId: product.id }));
  }

  delete(product: Product) {
    this.store.dispatch(
      ProductPageActions.deleteProduct({ productId: product.id }))
  }
}
