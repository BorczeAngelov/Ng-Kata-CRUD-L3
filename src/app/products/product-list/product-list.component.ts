import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, mergeMap, switchAll, switchMap, tap } from 'rxjs/operators';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { getProducts, State } from '../state';
import { ProductPageActions } from '../state/actions';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products$?: Observable<Product[]>;

  listFilter?: string;
  filteredProducts$?: Observable<Product[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private store: Store<State>,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.store.dispatch(ProductPageActions.loadProducts());
    this.products$ = this.store.select(getProducts);

    this.filteredProducts$ = this.searchTerms.pipe(
      debounceTime(300),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.productService.searchProducts(term)),
      tap(data => console.log(data))
    );



    this.products$.subscribe(
      _ => {
        console.log("retrigger products");

        this.filter();
      }
    );
  }

  productSelected(product: Product) {
    this.store.dispatch(
      ProductPageActions.setCurrentProduct({ currentProductId: product.id }));
  }

  delete(product: Product) {
    this.store.dispatch(
      ProductPageActions.deleteProduct({ productId: product.id }))
  }

  create() {
    const newProduct: Product = {
      id: 0,
      productName: 'New product',
      description: 'Description of the new product'
    }

    this.store.dispatch(
      ProductPageActions.createProduct({ product: newProduct }))
  }

  // Push a search term into the observable stream.
  filter() {
    console.log("applying filter" + this.listFilter);

    if (this.listFilter)
      this.searchTerms.next(this.listFilter);
    else
      this.searchTerms.next("");
  }
}
