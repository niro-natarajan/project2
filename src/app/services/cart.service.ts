import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, combineLatest, map } from 'rxjs';
import { Order, buynow, products } from './attribute';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  //cart
  items: any[] = [];
  total: number = 0;
  counter: number = 0;

  private cartData: any = null; // Initialize cartData

  private buyNowData: any = null;
  private isBuyNow: boolean = false;

  private orderHistory: Order[] = [];


  constructor() { }

  setCartData(data: any) {
    this.cartData = data;
    this.isBuyNow = false;
  }

  setBuyNowData(data: buynow) {
    this.buyNowData = data;
    this.isBuyNow = true;
  }

  getData() {
    if (this.isBuyNow) {
      return this.buyNowData;
    } else {
      return this.cartData;
    }
  }

  // Method to clear cart data
  clearCartData(): void {
    this.cartData = null;
  }


  // addOrder(order: Order) {
  //   this.orderHistory.push(order);
  // }

  // getOrderHistory() {
  //   return this.orderHistory;
  // }



}
