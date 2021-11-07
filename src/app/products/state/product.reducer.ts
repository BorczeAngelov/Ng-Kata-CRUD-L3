import { ProductPageActions, ProductApiActions } from './actions'
import { Product } from "../product";
import { createReducer, on } from "@ngrx/store";

export interface ProductState {
    currentProductId: number | null,
    products: Product[],
    error: string
}

const initialState: ProductState = {
    currentProductId: null,
    products: [],
    error: ""
}

export const productReducer = createReducer<ProductState>(
    initialState,
    on(ProductApiActions.loadProductsSuccess, (state, action): ProductState => {
        return {
            ...state,
            products: action.products,
            error: ''
        }
    }),
    on(ProductApiActions.loadProductsFailure, (state, action): ProductState => {
        return {
            ...state,
            products: [],
            error: action.error
        }
    }),
    on(ProductPageActions.setCurrentProduct, (state, action): ProductState => {
        return {
            ...state,
            currentProductId: action.currentProductId
        };
    }),
    on(ProductApiActions.deleteProductSuccess, (state, action): ProductState => {
        const updatedProducts = state.products.filter(item => item.id != action.productId)
        return {
            ...state,
            products: updatedProducts,
            currentProductId: null,
            error: ''
        }
    }),
    on(ProductApiActions.deleteProductFailure, (state, action): ProductState => {
        return {
            ...state,
            error: action.error
        }
    })
);