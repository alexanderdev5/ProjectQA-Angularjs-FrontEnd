import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetEmployees } from '../models/get-employees';
import { Observable } from 'rxjs';
import { EmployeeList } from '../models/employee-list';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee';
import { map } from 'rxjs/operators';
import { BestEmployee } from '../models/best-employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient:HttpClient) { }

  getEmployees(request:GetEmployees):Observable<EmployeeList>{
    return this.httpClient.post<EmployeeList>(`${environment.ApiUrl}employees/paginated`, request)
  }

  getEmployeeById(id:number):Observable<Employee>{
    return this.httpClient.get<Employee>(`${environment.ApiUrl}employees/${id}`);
  }

  updateEmployee(request:Employee):Observable<Response>{
    return this.httpClient.put(`${environment.ApiUrl}employees`, request)
      .pipe(
        map((response: Response) => response)
      );
  }

  deleteEmployee(id:number):Observable<Response>{
    return this.httpClient.delete(`${environment.ApiUrl}employees/${id}`)
      .pipe(
        map((response: Response) => response)
      );
  }

  getBestEmployee():Observable<BestEmployee>{
    return this.httpClient.get<BestEmployee>(`${environment.ApiUrl}employees/best`);
  }

  createEmployee(request:Employee):Observable<Response>{
    return this.httpClient.post(`${environment.ApiUrl}employees`, request)
    .pipe(
      map((response: Response) => response)
    );
  }
}
