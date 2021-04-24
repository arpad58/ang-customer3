import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../model/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  serverAddress: string = 'https://nettuts.hu/jms/arpad58/customers';

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.serverAddress}`);
  }

  delCustomer(customer: Customer): Observable<Customer> {
    return this.http.delete<Customer>(`${this.serverAddress}/${customer.id}`);
  }

  get(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.serverAddress}/${id}`);
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.patch<Customer>(`${this.serverAddress}/${customer.id}`, customer);
  }

  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.serverAddress}`, customer);
  }
}


