import { createAction, props } from "@ngrx/store";

export const loadProducts = createAction(
    '[Product Page] Load'
);

export const setCurrentProduct = createAction(
    '[Product Page] Set Current Product',
    props<{ currentProductId: number }>()
);