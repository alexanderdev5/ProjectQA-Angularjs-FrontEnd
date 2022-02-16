import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetProducts } from '../models/get-product';
import { ProductList } from 'src/app/product/models/product-list';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(request: GetProducts): Observable<ProductList> {
    return this.http.post<ProductList>(`${environment.ApiUrl}products/paginated`, request);
  }
}
