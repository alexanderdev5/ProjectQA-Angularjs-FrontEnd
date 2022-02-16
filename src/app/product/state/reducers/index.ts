import * as fromProductReducer from '../reducers/product.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface ProductState {
    product: fromProductReducer.State;
}

export const reducers: ActionReducerMap<ProductState> = {
    product: fromProductReducer.ProductReducer
}

export const getProductModuleState = createFeatureSelector<ProductState>('product');
export const getProductState = createSelector(getProductModuleState, state => state.product);

export const getProducts = createSelector(getProductState, fromProductReducer.getProducts);
export const totalRecords = createSelector(getProductState, fromProductReducer.getTotalRecords);
export const getProduct = createSelector(getProductState,fromProductReducer.getProduct);
export const getProductBestSellers = createSelector(getProductState,fromProductReducer.getProductBestSellers);

