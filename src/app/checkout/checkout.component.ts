import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Order, products } from '../services/attribute';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { clearCart } from '../store/cart/cart.actions';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from '../services/order.service';
// import { Order } from '../services/attribute';

interface address {
  name: string,
  phonenumber: string,
  address: string,
  pincode: string,
}

interface cardDetail{
  Name: string,
  cardNumber: string,
  date: string,
  cvv: string
}

// export interface Order {
//   items: any[];
//   total: number;
//   address: string;
//   date: Date;
//   price: string
// }

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {

  //checkout--------------
  //buynow
  totalPrice: number = 0;
  cartItems$: Observable<products[]> | undefined;

  title: string = '';
  price: number = 0;
  total: number = 0;

  offer: number = 0;

  shippingForm: any = {};

  cartData: any;

  data: products[] = [];

  selectedPaymentMethod: string = 'cod';

  cardDetails: any={};

  orderHistory: Order[] = [];


  constructor(
    private cartService: CartService,
    private snackBar: MatSnackBar,
    private router: Router,
    private store: Store,
    private dialog: MatDialog,
    private orderService: OrderService,
  ) { }


  ngOnInit(): void {
    // Retrieve data (either cart or Buy Now) from the service
    this.cartData = this.cartService.getData();
  }


  // coupon---------
  applyCoupon() {
    // this.offer = this.total - this.coupon;
    this.offer = this.cartData.total - (this.cartData.total * 0.16);
    console.log("Total after Applied offer: ", this.offer);
    this.showMessage('Coupon Applied');
  }

  // shipping entry form
  onShipping(form: address) {
    console.log('Form submitted!');
    console.log('Form values:', form);
    // this.shippingForm = form; 

    // Concatenate the form values into a single object
    this.shippingForm = {
      name: form.name,
      phonenumber: form.phonenumber,
      address: form.address,
      pincode: form.pincode
  };

  console.log('Concatenated form values:', this.shippingForm);
  
  }

  onPayment(card: cardDetail) {

    console.log('Selected payment method:', this.selectedPaymentMethod);

  // console.log('Payment details:', paymentDetails);

    console.log("Card Details : ", card);
    this.cardDetails = card;
    this.snackBar.open('Payment successful', 'Close', {
      duration: 3000
    });
  }

  showMessage(message: string): void {
    this.snackBar.open(message, 'X', {
      duration: 2000
    });
  }


  placeOrder(): void {
    console.log('Placing order...');

    this.showMessage("Order Placed");

    console.log('Shipping Address:', this.shippingForm);
    console.log('Payment Method:', this.cardDetails);

    this.data.push(this.cartData);

    let order: Order;
 

    // Create an order object using the form values
    order = {
      id: 1, 
      items: this.cartData.items,
      total: this.cartData.total,
      price: this.cartData.price,
      shippingAddress: this.shippingForm
    };
    console.log("itemssss------", this.cartData.items)
    console.log("total------", this.cartData.total)
    this.cartData.total = this.cartData.price

    console.log("price------", this.cartData.total)
 
    this.orderService.placeOrder(order).subscribe(
      () => {
        console.log('Order placed successfully:', order);
      },
      (error) => {
        console.error('Error placing order:', error);
      }
    );
    //  this.shippingForm.reset();
    //  this.cardDetails.reset();
     this.store.dispatch(clearCart());
     this.router.navigate(['home']);
   }
























    // this.orderService.placeOrder({
    //   cartData: this.cartData,
    //   shippingInfo: this.shippingForm,
    //   paymentMethod: this.selectedPaymentMethod
    // }).subscribe(
    //   (response) => {
    //     console.log('Order placed successfully:', response);
    //     this.showMessage("Order Placed");
    //     this.router.navigate(['/']);
    //   },
    //   (error) => {
    //     console.error('Error placing order:', error);
    //     this.showMessage("Failed to place order. Please try again.");
    //   }
    // );

    // Clear the cart data
    // this.cartService.clearCartData();
    // console.log('Cart data cleared.');

    // this.store.dispatch(clearCart());
  }



  //   placeOrder(): void {
  //     console.log('Placing order...');

  //     // Clear the cart data
  //     this.cartService.clearCartData();
  //     console.log('Cart data cleared.');

  //     // Add the current order to the order history
  //     const currentOrder: Order = {
  //       items: this.cartData.items, // Assuming cartData contains order items
  //       total: this.cartData.total,
  //       address: this.formData.Address,
  //       date: new Date(), // Set the current date
  //       price: this.cartData.price
  //     };

  //     this.orderHistory.push(currentOrder);

  //     this.showMessage("Order Placed");

  //     this.store.dispatch(clearCart());

  //   }

  //   openOrderHistoryDialog(): void {
  //     const dialogRef = this.dialog.open(OrderhistoryComponent, {
  //       width: '600px',
  //       data: { 
  //         orderHistory: this.orderHistory,
  //         offer: this.offer 
  //        }

  //     });
  // console.log("OEDER",this.orderHistory)  
  //     dialogRef.afterClosed().subscribe(result => {
  //       console.log('The order history dialog was closed');
  //     });
  //   }





