import { Product } from '../../models/product';
import * as productActions from '../actions/product.actions';

export interface State {
    products: Product[];
    totalProductRecords: number;
}
const initialState: State = {
    products: [],
    totalProductRecords: 0
};

export function ProductReducer(state = initialState, action: productActions.Actions): State {
    switch (action.type) {
        case productActions.ProductActionTypes.LoadProducts: {
            return state;
        }
        case productActions.ProductActionTypes.LoadProductsComplete: {
            return {
                ...state,
                products: action.payload.data,
                totalProductRecords: action.payload.totalRecords
            };
        }
        default: return state;
    }
}

export const getProducts = (state: State) => state.products;
export const getTotalProductRecords = (state: State) => state.totalProductRecords;