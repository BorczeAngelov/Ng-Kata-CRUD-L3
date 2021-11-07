import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as AppState from '../../state/app.state'
import { Product } from "../product";

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

export const getCurrentProductId = createSelector(
    getProductFeatureState,
    state => state.currentProductId
);

export const getCurrentProduct = createSelector(
    getProductFeatureState,
    getCurrentProductId,
    (state, currentProductId) => {
        if (currentProductId === 0) {
            return {
                id: 0,
                productName: 'New Product',
                description: 'description test123',
            } as Product
        }
        else {
            return currentProductId ? state.products.find(p => p.id === currentProductId) : null;
        }
    }
);