import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetOrder } from '../models/get-order';
import { Observable } from 'rxjs';
import { OrderList } from '../models/order-list';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { OrderListItem } from '../models/order-list-item';
import { PreOrder } from '../models/pre-order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  getOrders(request: GetOrder): Observable<OrderList> {
    return this.httpClient.post<OrderList>(`${environment.ApiUrl}orders/paginated`, request)
      .pipe(
        map((response: any) => {
          const orderList: OrderList = new OrderList();
          if (!response.data) {
            orderList.data = [];
            return orderList;
          }

          const orderListItem: OrderListItem[] = [];
          for (let index = 0; index < response.data.length; index++) {
            const element = response.data[index];
            orderListItem.push(OrderListItem.mapFromResponse(element))
          }

          orderList.data = orderListItem;
          orderList.totalRecords = response.totalRecords;
          return orderList;
        })
      );
  }

  addOrder(request: PreOrder): Observable<number> {
    return this.httpClient.post(`${environment.ApiUrl}orders`, request)
      .pipe(
        map((response: number) => response)
      );
  }

  getOrderById(id: number): Observable<OrderListItem> {
    return this.httpClient.get<OrderListItem>(`${environment.ApiUrl}orders/${id}`)
      .pipe(
        map((response: any) => {
          let orderListItem: OrderListItem = new OrderListItem();
          orderListItem = OrderListItem.mapFromResponse(response);
          return orderListItem;
        })
      );
  }

  updateOrder(request: PreOrder): Observable<Response> {
    return this.httpClient.put(`${environment.ApiUrl}orders`, request)
      .pipe(
        map((response: Response) => response)
      );
  }

  deleteOrderDetail(orderId: number, orderDetailId: number): Observable<Response> {
    return this.httpClient.delete(`${environment.ApiUrl}orders/${orderId}/detail/${orderDetailId}`)
      .pipe(
        map((response: Response) => response)
      );
  }

  deleteOrder(orderId: number): Observable<Response> {
    return this.httpClient.delete(`${environment.ApiUrl}orders/${orderId}`)
      .pipe(
        map((response: Response) => response)
      );
  }
}
