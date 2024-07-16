import { Component } from '@angular/core';
import { Observable, take } from 'rxjs';
import { products } from '../services/attribute';
import { Store, select } from '@ngrx/store';
import { selectCartCounter, selectCartItems } from '../store/cart/cart.selector';
import { decrementQuantity, deleteFromCart, incrementQuantity } from '../store/cart/cart.actions';
import { CartService } from '../services/cart.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  items$: Observable<products[]> | undefined;
  counter$: Observable<number> | undefined;
  total: number = 0;
  totalprice: number = 0;
  //--cost of a single item
  cost: number[] = []; // Array to hold total prices for each item
  // displayedColumns: string[] = ['title', 'cost']; // Define displayed columns for mat-table


  constructor(
    private store: Store,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.items$ = this.store.pipe(select(selectCartItems));
    console.log("Added Cart Items - ", this.items$);
    this.counter$ = this.store.pipe(select(selectCartCounter));
    console.log("Cart Counter - ", this.counter$);
    // console.log("Items:", this.items$);

    // Calculate initial total
    this.items$.subscribe(items => {
      this.total = this.calculateTotal(items);

      //-------------------
      // Extract value from counter$ before passing it to setCartData
      // this.counter$?.subscribe(counter => {
      //   // Wherever you have the data ready
      //   this.cartService.setCartData(items, this.total, counter);
      // });
    });

    //------------checkout detail---------------
    // Wherever you have the data ready
    // this.cartService.setCartData(items, this.total, this.counter$);

  }


  incrementQuantity(item: products) {
    this.store.dispatch(incrementQuantity({ id: item.id })); // Dispatch action to increment quantity
  }

  decrementQuantity(item: products) {
    this.store.dispatch(decrementQuantity({ id: item.id })); // Dispatch action to decrement quantity
  }

  deleteItem(id: number) {
    this.store.dispatch(deleteFromCart({ id }));
    // this.calculateTotalPrice();
  }


  calculateTotal(items: products[]) {
    // Log the array of items
    console.log("Items:", items);
    //--cost of a single item
    this.cost = []; // Clear the array before recalculating

    // Initialize total cost
    const total = items.reduce((acc, item) => {
      // cart item
      console.log("Cart Item:", item);
      console.log("Cart Price:", item.price);
      console.log("Cart Quantity:", item.quantity);
      // Convert price to a number
      const price = parseFloat(item.price.replace(/[^\d.-]/g, ''));
      // Get quantity
      const quantity = item.quantity;
      // const price = item.price;
      // console.log("Price:-----", price, typeof price);
      // console.log("Quantity:------", quantity, typeof quantity);

      // If both price and quantity are valid numbers, calculate total price
      if (!isNaN(price) && !isNaN(quantity)) {
        this.totalprice = price * quantity;
        console.log("Price:", this.totalprice);     //--cost of a single item
        this.cost.push(this.totalprice); // Store the total price in the array

        console.log("cost", this.cost);
        return acc + this.totalprice;   // Add total price to accumulator
      } else {
        //--cost of a single item
        this.cost.push(0); // Store 0 if price or quantity is not valid

        // Log an error if price or quantity is not a valid number
        console.log("Invalid price or quantity for item:", item);

        // Return accumulator without adding to total
        return acc;
      }
    }, 0); // Initial value for accumulator

    console.log("Total :", total);
    // console.log("cost", this.cost);
    this.total = total

    return total;
  }

  // checkout() {
  //   if (this.items$) {
  //     this.items$.pipe(take(1)).subscribe(cartItems => {
  //       this.cartService.setCartData(this.total, cartItems);
  //       this.router.navigate(['/checkout'])
  //     });
  //   }
  // }


  checkout() {
    if (this.items$) {
        this.items$.pipe(take(1)).subscribe(cartItems => {
          // Calculate the cost for each item and create a new object with the cost property
          const updatedCartItems = cartItems.map(item => {
            const price = parseFloat(item.price);
            const quantity = item.quantity;

            // Create a new object with the existing item properties and the cost property
            return {
                ...item,
                cost: price * quantity
            };
        });

        // Log the updated cart items with cost
        console.log('Updated cart items with cost:', updatedCartItems);

          // // Log the imageUrl of each item
          //   cartItems.forEach(item => {
          //       console.log('ImageUrl:', item.imageUrl);
          //   });
            // Prepare the cart data to be passed to the checkout component
            const cartData = {
                total: this.total,
                items: cartItems
                // items: cartItems.map(item => ({
                //     id: item.id,
                //     name: item.title,
                //     price: item.price,
                //     quantity: item.quantity,
                //     imageUrl: item.imageUrl // Include imageUrl property
                // })),
            };

            // Use the Angular Router to navigate to the checkout component
            // Pass the cart data as state
             // Log the cart data to verify it
             console.log('Cart data to be passed to checkout:', cartData);
            
            //  console.log("image url : ", items )
              // Set cart data in the service
            this.cartService.setCartData(cartData);

             // Use the router to navigate to the checkout route and pass the cart data as state
             this.router.navigate(['/checkout'], { state: cartData });
        });
    }
}


  // calculateTotal(items: products[]): number {
  //   console.log("Items:", items);
  //   const total = items.reduce((acc, item) => {
  //     console.log("Item:", item);
  //     console.log("Price:", item.price);
  //     console.log("Quantity:", item.quantity);
  //     // const totalprice = (parseFloat(item.price) * (item.quantity))
  //     const price = Number(item.price);
  //     const quantity = item.quantity;


  //     console.log("Price:-----", price, typeof price);
  // console.log("Quantity:------", quantity, typeof quantity);

  //     // const totalprice = price * quantity;
  //     // console.log(totalprice,"- ----------------------total price")

  //     if (!isNaN(price) && !isNaN(quantity)) {
  //       const totalprice = price * quantity;
  //       console.log("Total Price:", totalprice);

  //       return acc + totalprice;
  //     } else {
  //       console.log("Invalid price or quantity for item:", item);
  //       return acc;
  //     }
  //     // return acc + (parseFloat(item.price) * item.quantity);
  //   }, 0);

  //   console.log("Total:", total);
  //   return total;
  // }




}