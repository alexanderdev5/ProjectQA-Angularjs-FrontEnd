import { SearchOrderCriteria } from '../../models/search-order-criteria';
import * as orderActions from '../actions/order.actions';
import { OrderListItem } from '../../models/order-list-item';

export interface State {
    query: SearchOrderCriteria;
    orders: OrderListItem[];
    totalRecords: number;
    orderListItem : OrderListItem;
}

const initialState: State = {
    query: new SearchOrderCriteria(),
    orders: [],
    totalRecords: 0,
    orderListItem: new OrderListItem()
}

export function OrderReducer(state = initialState, action: orderActions.Actions): State {
    switch (action.type) {
        case orderActions.OrderActionTypes.UpdateOrderSearchCriteria: {
            if (action.payload) {
                return {
                    ...state,
                    query: action.payload
                }
            }
        }
        case orderActions.OrderActionTypes.LoadOrders: {
            return state;
        }
        case orderActions.OrderActionTypes.LoadOrdersComplete:
            {
                return {
                    ...state,
                    orders: action.payload.data,
                    totalRecords: action.payload.totalRecords
                }
            }
        case orderActions.OrderActionTypes.AddOrder: {
            return state;
        }
        case orderActions.OrderActionTypes.AddOrderComplete: {
            return state;
        }
        case orderActions.OrderActionTypes.LoadOrderById: {
            return state;
        }
        case orderActions.OrderActionTypes.LoadOrderByIdComplete: {
            return {
                ...state,
                orderListItem: action.payload
            };
        }
        case orderActions.OrderActionTypes.UpdateOrder: {
            return state;
        }
        case orderActions.OrderActionTypes.UpdateOrderComplete: {
            return state;
        }
        case orderActions.OrderActionTypes.DeleteOrderDetail: {
            return state;
        }
        case orderActions.OrderActionTypes.DeleteOrderDetailComplete: {
            return state;
        }
        case orderActions.OrderActionTypes.DeleteOrder: {
            return state;
        }
        case orderActions.OrderActionTypes.DeleteOrderComplete: {
            return state;
        }
        default:
            return state;
    }
}

export const getQuery = (state: State) => state.query;
export const getOrders = (state: State) => state.orders;
export const getTotalOrderRecords = (state: State) => state.totalRecords;
export const getOrderById = (state: State) => state.orderListItem;