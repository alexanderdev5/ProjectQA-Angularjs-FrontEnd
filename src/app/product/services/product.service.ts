import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetProduct } from '../models/get-product';
import { Observable } from 'rxjs';
import { ProductList } from '../models/product-list';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';
import { map } from 'rxjs/operators';
import { ProductBestSeller } from '../models/best-seller';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getProducts(request: GetProduct): Observable<ProductList> {
    return this.httpClient.post<ProductList>(`${environment.ApiUrl}products/paginated`, request);
  }

  getProductById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${environment.ApiUrl}products/${id}`)
  }

  updateProduct(product: Product): Observable<Response> {
    return this.httpClient.put(`${environment.ApiUrl}products`, product)
      .pipe(
        map((response: Response) => response)
      )
  }

  deleteProduct(productId: number): Observable<Response> {
    return this.httpClient.delete(`${environment.ApiUrl}products/${productId}`)
      .pipe(
        map((response: Response) => response)
      );
  }

  addProduct(product: Product): Observable<Response> {
    return this.httpClient.post(`${environment.ApiUrl}products`, product)
      .pipe(
        map((response: Response) => response)
      );
  }
  getBestSellers(): Observable<ProductBestSeller[]>{
    return this.httpClient.get(`${environment.ApiUrl}products/bestSellers`)
    .pipe(
      map((response:any)=>{
        return response.data.map((producto:any)=>{
          return ProductBestSeller.mapFromResponse(producto,response.totalVentas)
        })
      })
    );
  }
}
