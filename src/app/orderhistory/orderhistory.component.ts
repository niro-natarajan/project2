import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { Order } from '../checkout/checkout.component'; // Import the Order interface from your checkout component
import { CartService } from '../services/cart.service';
import { Order } from '../services/attribute';
import { OrderService } from '../services/order.service';


@Component({
  selector: 'app-orderhistory',
  templateUrl: './orderhistory.component.html',
  styleUrl: './orderhistory.component.scss'
})
export class OrderhistoryComponent {

  // constructor(private orderService: OrderService) { }

  // ngOnInit(): void {
  //   this.orderService.getOrderHistory().subscribe(
  //     (response) => {
  //       this.orders = response;
  //     },
  //     (error) => {
  //       console.error('Error fetching order history:', error);
  //     }
  //   );
  // }

  orders: Order[] = [];
  Date = new Date();
 
  constructor(private orderService: OrderService) {}
 
  ngOnInit(): void {
    this.loadOrders();
  }
 
  loadOrders(): void {
    this.orderService.getOrderHistory().subscribe(orders => {  
      this.orders = orders;
    });
  }
 

  // orderHistory: Order[] = [];

  // constructor(private cartService: CartService) { }

  // ngOnInit(): void {
  //   this.orderHistory = this.cartService.getOrderHistory();
  // }
  

  //---------------this
  // orderHistory: Order[] = [];

  // constructor(private cartService: CartService) { }

  // ngOnInit(): void {
  //   this.loadOrderHistory();
  // }

  // loadOrderHistory(): void {
  //   this.orderHistory = this.cartService.getOrderHistory();
  //   console.log('Order History:', this.orderHistory); // Log the orderHistory array

  // }
}
