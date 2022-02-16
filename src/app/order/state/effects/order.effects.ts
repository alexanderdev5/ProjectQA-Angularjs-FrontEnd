import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { OrderService } from '../../services/order.service';
import { Store } from '@ngrx/store';
import * as fromRoot from './../reducers';
import * as orderActions from '../actions/order.actions';
import { switchMap, withLatestFrom, map } from 'rxjs/operators';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Injectable()
export class OrderEffects {
    constructor(private actions$: Actions,
        private orderService: OrderService,
        private store: Store<fromRoot.OrderState>,
        private router: Router) {

    }

    @Effect()
    getOrders$ = this.actions$.pipe(
        ofType<orderActions.LoadOrders>(orderActions.OrderActionTypes.LoadOrders),
        withLatestFrom(this.store.select(fromRoot.getQuery)),
        switchMap(([action, query]) => {
            let orderRequest = action.request;
            orderRequest.status = (query.status ? query.status : null);
            orderRequest.dateFrom = query.dateFrom ? moment(query.dateFrom).format("YYYY/MM/DD") : null;
            orderRequest.dateTo = query.dateTo ? moment(query.dateTo).format("YYYY/MM/DD") : null;

            return this.orderService.getOrders(orderRequest)
                .pipe(
                    map(data => new orderActions.LoadOrdersComplete(data))
                )
        })
    );

    @Effect()
    addOrder$ = this.actions$.pipe(
        ofType<orderActions.AddOrder>(orderActions.OrderActionTypes.AddOrder),
        switchMap(action => this.orderService.addOrder(action.request)
            .pipe(
                map(response => {
                    this.router.navigate(['/order']);
                    return new orderActions.AddOrderComplete(response);
                })
            ))
    );

    
    @Effect()
    getOrdersById$ = this.actions$.pipe(
        ofType<orderActions.LoadOrderById>(orderActions.OrderActionTypes.LoadOrderById),
        switchMap(action => this.orderService.getOrderById(action.orderId)
            .pipe(
                map(data => new orderActions.LoadOrderByIdComplete(data))
            ))
    );

    @Effect()
    updateOrder$ = this.actions$.pipe(
        ofType<orderActions.UpdateOrder>(orderActions.OrderActionTypes.UpdateOrder),
        switchMap(action => this.orderService.updateOrder(action.request)
            .pipe(
                map(_ => {
                    this.router.navigate(['/order']);
                    return new orderActions.UpdateOrderComplete();
                })
            ))
    );

    @Effect()
    deleteOrderDetail$ = this.actions$.pipe(
        ofType<orderActions.DeleteOrderDetail>(orderActions.OrderActionTypes.DeleteOrderDetail),
        switchMap(action => this.orderService.deleteOrderDetail(action.orderId, action.orderDetailId)
            .pipe(
                map(_ => new orderActions.DeleteOrderDetailComplete())
            ))
    );

    @Effect()
    deleteOrder$ = this.actions$.pipe(
        ofType<orderActions.DeleteOrder>(orderActions.OrderActionTypes.DeleteOrder),
        switchMap(action => this.orderService.deleteOrder(action.orderId)
            .pipe(
                map(_ => new orderActions.DeleteOrderComplete())
            ))
    );
}