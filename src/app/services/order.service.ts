import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from './attribute';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  placeOrder(orderDetails: Order) {
    console.log("DETAILS __",orderDetails)
    return this.http.post<Order>('http://localhost:8080/orders', orderDetails);
  }

  getOrderHistory() {
    return this.http.get<Order[]>('http://localhost:8080/getAllOrders');
  }
}
