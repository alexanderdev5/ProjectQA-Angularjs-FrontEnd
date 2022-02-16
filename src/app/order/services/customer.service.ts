import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetCustomers } from '../models/gest-customers';
import { Observable } from 'rxjs';
import { CustomerList } from '../models/customer-list';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getCustomers(request: GetCustomers): Observable<CustomerList> {
    return this.http.post<CustomerList>(`${environment.ApiUrl}customers/paginated`, request)
      .pipe(
        map(response => {
          const customers = response.data.map((customer: any) => Customer.mapFromResponse(customer));
          return new CustomerList(customers, response.totalRecords);
        })
      );
  }
}

