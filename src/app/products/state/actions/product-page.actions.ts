import { createAction, props } from "@ngrx/store";
import { Product } from "../../product";

export const createProduct = createAction(
    '[Product Page] Create Product',
    props<{ product: Product }>()
);

export const updateProduct = createAction(
    '[Product Page] Update Product',
    props<{ product: Product }>()
);

export const loadProducts = createAction(
    '[Product Page] Load'
);

export const setCurrentProduct = createAction(
    '[Product Page] Set Current Product',
    props<{ currentProductId: number }>()
);

export const deleteProduct = createAction(
    '[Product Page] Delete Product',
    props<{ productId: number }>()
);