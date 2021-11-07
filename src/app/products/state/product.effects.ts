import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { ProductService } from '../product.service';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductPageActions, ProductApiActions } from './actions'

@Injectable()
export class ProductEffects {

    constructor(private actions$: Actions,
        private productService: ProductService) { }


    loadProduct$ = createEffect(() => {
        return this.actions$
            .pipe(
                ofType(ProductPageActions.loadProducts),
                mergeMap(() =>
                    this.productService.getProducts()
                        .pipe(
                            map(products => ProductApiActions.loadProductsSuccess({ products })),
                            catchError(error => of(ProductApiActions.loadProductsFailure({ error })))
                        )
                )
            )
    });

}