import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as AppState from '../../state/app.state'

import { ProductState } from "./product.reducer";

export interface State extends AppState.State {
    products: ProductState
}

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getProducts = createSelector(
    getProductFeatureState,
    state => state.products
);

export const getError = createSelector(
    getProductFeatureState,
    state => state.error
);