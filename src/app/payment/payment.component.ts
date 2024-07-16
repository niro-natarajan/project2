import { Component } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {

  selectedPaymentMethod: string = 'cod'; // Default to Cash on Delivery

}
