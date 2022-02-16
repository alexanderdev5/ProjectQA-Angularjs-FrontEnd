import { Action } from '@ngrx/store';
import { SearchOrderCriteria } from '../../models/search-order-criteria';
import { GetOrder } from '../../models/get-order';
import { OrderList } from '../../models/order-list';
import { PreOrder } from '../../models/pre-order';
import { OrderListItem } from '../../models/order-list-item';

export enum OrderActionTypes {
    UpdateOrderSearchCriteria = '[Order] Update Order Search Criteria',
    LoadOrders = '[Order] Load Orders',
    LoadOrdersComplete = '[Order] Load Orders Complete',
    AddOrder = '[Order] Add Order',
    AddOrderComplete = '[Order] Add Order Complete',
    LoadOrderById = '[Order] Load Order By Id',
    LoadOrderByIdComplete = '[Order] Load Order By Id Complete',
    UpdateOrder = '[Order] Update Order',
    UpdateOrderComplete = '[Order] Update Order Complete',
    DeleteOrderDetail = '[Order] Delete Order Detail',
    DeleteOrderDetailComplete = '[Order] Delete Order Detail Complete',
    DeleteOrder = '[Order] Delete Order',
    DeleteOrderComplete = '[Order] Delete Order Complete'
}

export class UpdateOrderSearchCriteria implements Action {
    readonly type = OrderActionTypes.UpdateOrderSearchCriteria;
    constructor(public payload: SearchOrderCriteria) { }
}

export class LoadOrders implements Action {
    readonly type = OrderActionTypes.LoadOrders;
    constructor(public request: GetOrder) { }
}

export class LoadOrdersComplete implements Action {
    readonly type = OrderActionTypes.LoadOrdersComplete;
    constructor(public payload: OrderList) { }
}

export class AddOrder implements Action {
    readonly type = OrderActionTypes.AddOrder;
    constructor(public request: PreOrder) { }
}
export class AddOrderComplete implements Action {
    readonly type = OrderActionTypes.AddOrderComplete;
    constructor(public orderId: number) { }
}

export class LoadOrderById implements Action {
    readonly type = OrderActionTypes.LoadOrderById;
    constructor(public orderId: number) { }
}
export class LoadOrderByIdComplete implements Action {
    readonly type = OrderActionTypes.LoadOrderByIdComplete;
    constructor(public payload: OrderListItem) { }
}

export class UpdateOrder implements Action {
    readonly type = OrderActionTypes.UpdateOrder;
    constructor(public request: PreOrder) { }
}
export class UpdateOrderComplete implements Action {
    readonly type = OrderActionTypes.UpdateOrderComplete;
    constructor() { }
}
export class DeleteOrderDetail implements Action {
    readonly type = OrderActionTypes.DeleteOrderDetail;
    constructor(public orderId: number, public orderDetailId: number) { }
}
export class DeleteOrderDetailComplete implements Action {
    readonly type = OrderActionTypes.DeleteOrderDetailComplete;
    constructor() { }
}
export class DeleteOrder implements Action {
    readonly type = OrderActionTypes.DeleteOrder;
    constructor(public orderId: number) { }
}
export class DeleteOrderComplete implements Action {
    readonly type = OrderActionTypes.DeleteOrderComplete;
    constructor() { }
}

export type Actions = UpdateOrderSearchCriteria 
| LoadOrders 
| LoadOrdersComplete
| AddOrder 
| AddOrderComplete 
| LoadOrderById
| LoadOrderByIdComplete
| UpdateOrder
| UpdateOrderComplete
| DeleteOrderDetail
| DeleteOrderDetailComplete
| DeleteOrder
| DeleteOrderComplete;