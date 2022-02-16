import { GetProducts } from '../../models/get-product';
import { Action } from '@ngrx/store';
import { ProductList } from '../../models/product-list';

export enum ProductActionTypes {
    LoadProducts = '[Order-Product] Load Products',
    LoadProductsComplete = '[Order-Product] Load Products Complete'
}

export class LoadProducts implements Action {
    readonly type = ProductActionTypes.LoadProducts;
    constructor(public request: GetProducts) { }
}

export class LoadProductsComplete implements Action {
    readonly type = ProductActionTypes.LoadProductsComplete;
    constructor(public payload: ProductList) { }
}

export type Actions =
    | LoadProducts
    | LoadProductsComplete;