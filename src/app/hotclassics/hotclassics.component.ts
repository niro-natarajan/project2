import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { buynow, products } from '../services/attribute';
import { Store } from '@ngrx/store';
import { addToCart } from '../store/cart/cart.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { PageEvent } from '@angular/material/paginator';

interface CheckboxItem {
  name: string;
  checked: boolean
}

@Component({
  selector: 'app-hotclassics',
  templateUrl: './hotclassics.component.html',
  styleUrl: './hotclassics.component.scss'
})
export class HotclassicsComponent implements OnInit {

  coffees: CheckboxItem[] = [
    { name: 'Hot Coffee', checked: false },
    { name: 'Cold Coffee', checked: false },
  ];

  priceRanges: CheckboxItem[] = [
    { name: '> 200', checked: false },
    { name: '200 - 300', checked: false },
    { name: '500 <', checked: false },
  ];

  menuList: products[] = [];
  filteredCoffee: products[] = [];
  filteredItems: products[] = [];
  appliedFilter: boolean = false;

  pageSize: number = 3; // Number of items per page
  pageSizeOptions: number[] = [3, 6, 9];

  constructor(
    private menuService: MenuService,
    private store: Store,
    private router: Router,
    private snackBar: MatSnackBar,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.displayMenu();

  }

  //menu datas from service
  displayMenu() {
    this.menuService.getAllMenu().subscribe(
      menu => {
        console.warn("Total menu", menu);
        this.menuList = menu;
        console.log("menuList", this.menuList);

 this.filteredCoffee = this.menuList ? [...this.menuList] : []; // Initialize filteredProducts with all products if available
      
        this.onPageChange({ pageIndex: 0, pageSize: this.pageSize, length: this.menuList.length });
 
             });
   
  }


  // Filter function
  applyFilters(): void {
    const filteredByCoffeeTypes = this.filterCoffeeTypes();
    const filteredByPriceRange = this.filterPriceRange();

    // Filter menuList based on both filteredByCoffeeTypes and filteredByPriceRange
    this.filteredCoffee = this.menuList.filter(data => {

      // Check if the data item matches any item in filteredByCoffeeTypes
      const matchesCoffeeType = filteredByCoffeeTypes.some(
        coffeeItem => coffeeItem.title === data.title
      );
      // Check if the data item matches any item in filteredByPriceRange
      const matchesPriceRange = filteredByPriceRange.some(
        priceItem => priceItem.title === data.title
      );
      return matchesCoffeeType || matchesPriceRange;
    });
    this.appliedFilter = true;
    console.log('Finally filtered coffee -------> :', this.filteredCoffee);

   
  }


  filterCoffeeTypes(): products[] {
    const selectedCoffees = this.coffees.filter(coffee => coffee.checked).map(coffee => coffee.name);
    console.log("SELECTED COFFEE: ", selectedCoffees);
    if (selectedCoffees.length > 0) {
      this.menuList.forEach(item => {
        // console.log("Checking item: ", item);
        if (selectedCoffees.includes('Hot Coffee') && item.type === 'hot') {
          // console.log("Adding item (Hot Coffee): ", item);
          // console.log("Coffee Type (HOT COFFEE) :", item.title, item.price, item.type)
          this.filteredItems.push(item);
        } else if (selectedCoffees.includes('Cold Coffee') && item.type === 'cold') {
          // console.log("Adding item (Cold Coffee): ", item);
          // console.log("Coffee Type (COLD COFFEE) :", item.title, item.price, item.type)
          this.filteredItems.push(item);
        }
      });
    }
    console.log("FILTERED ITEMS by coffee types : ", this.filteredItems);
    return this.filteredItems;
  }


  filterPriceRange() {
    const selectedPriceRanges = this.priceRanges.filter(price => price.checked).map(price => price.name);
    console.log("Selected price range : ", selectedPriceRanges);
    const rangeItems: products[] = [];
    if (selectedPriceRanges.length > 0) {
      this.menuList.forEach(item => {
        const priceString = item.price.replace(/[^\d.-]/g, ''); // Remove non-numeric characters
        const price = parseFloat(priceString);
        // console.log(item.price, "Item price");
        // console.log(price, "Parsed price");
        if (!isNaN(price)) {
          if (selectedPriceRanges.includes('> 200') && price < 200) {
            rangeItems.push(item);
          } else if (selectedPriceRanges.includes('200 - 300') && price >= 200 && price <= 300) {
            rangeItems.push(item);
          } else if (selectedPriceRanges.includes('500 <') && price > 500) {
            rangeItems.push(item);
          }
        }
      });
      console.log("FILTERED ITEMS BY PRICE RANGE", rangeItems);
    }
    return rangeItems;
  }


  showDetails(coffee: any) {
    console.log("Selected Coffee", coffee);
  }


  addToCart(coffee: products) {
    this.store.dispatch(addToCart({ product: coffee }));
    this.showMessage('Added to cart');
  }


  showMessage(message: string): void {
    this.snackBar.open(message, 'X', {
      duration: 2000
    });
  }


  buyNow(coffee: products) {
    console.log("Buy Now clicked:");
    console.log("Title:", coffee.title);
    console.log("Price:", coffee.price);
    console.log("Total:", coffee.price);
    console.log("Image URL:", coffee.imageUrl);
    const priceString = coffee.price.replace(/[^\d.-]/g, '');
    const price = parseFloat(priceString);
    if (isNaN(price)) {
      console.error('Invalid price value:', coffee.price);
      return;
    }
    const total = price; 
    // BuyNow object
    const buyNowData: buynow = {
      title: coffee.title,
      price: price,
      total: total,
      imageUrl: coffee.imageUrl
    };
    console.log('BuyNow data:', buyNowData);
    this.cartService.setBuyNowData(buyNowData);
    this.router.navigate(['/checkout']);
  }


  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.filteredCoffee = this.menuList.slice(startIndex, endIndex);

     
  }

  
  


















  // coffeedetail = [
  //   {
  //     title: 'Latte',
  //     type: 'hot',
  //     description: 'Typically made with one part espresso and two parts steamed milk, with a thin layer of frothed milk on top',
  //     price: '₹ 150',
  //     imageUrl: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/d3ab0d1e81b2ed300fc6d4399de422fd',
  //   },
  //   {
  //     title: 'Cappuccino',
  //     type: 'hot',
  //     description: 'Similar to a latte, but with a thicker layer of foam',
  //     price: '₹ 200',
  //     imageUrl: 'https://image.shutterstock.com/image-photo/cappuccino-coffee-beautiful-glass-on-260nw-2017631294.jpg'
  //   },
  //   {
  //     title: 'Americano',
  //     type: 'hot',
  //     description: 'A shot of espresso diluted with hot water',
  //     price: '₹ 180',
  //     imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEPb-tScXGnLDWxGHcMeKOmNi_pHrM7O-XKzgXSXYKptvf20gxk-sXQnwQ6FBPMznrXTw&usqp=CAU'
  //   },
  //   {
  //     title: 'Espresso',
  //     type: 'hot',
  //     description: 'A concentrated form of coffee, served in shots, and often the coffee base of many other beverages',
  //     price: '₹ 250',
  //     imageUrl: 'https://www.ilovedecaf.shop/wp-content/uploads/2022/10/luxe-organic-decaf-crema-copy.jpg.webp',
  //   },
  //   {
  //     title: 'Iced Cappuccino',
  //     type: 'cold',
  //     description: 'Just the classic Cappuccino on the rocks! ',
  //     price: '₹ 120',
  //     imageUrl: 'https://www.pauldmv.com/wp-content/uploads/2022/12/PAUL-Coffee-Iced-Cappuccino-1024x683.png',
  //   },
  //   {
  //     title: 'Iced Latte',
  //     type: 'cold',
  //     description: 'Your cup of smooth & cool to keep summer blues away',
  //     price: '₹ 150',
  //     imageUrl: 'https://www.torani.com/sites/default/files/recipes/illustration/iced%20latte%20with%20swirl.jpg',
  //   },
  //   {
  //     title: 'Iced MOCHA',
  //     type: 'cold',
  //     description: 'Stay calm with cold chocolate & coffee on the rocks',
  //     price: '₹ 200',
  //     imageUrl: 'https://images.ctfassets.net/v601h1fyjgba/5x572mICLA8SIK06LaRxV8/9cd38d07f301c1f62dae04246722c750/Iced_Cafe_Mocha.jpg',
  //   },
  //   {
  //     title: 'Iced AMERICANO',
  //     type: 'cold',
  //     description: 'Shots of expresso drowning in ices',
  //     price: '₹ 200',
  //     imageUrl: 'https://www.acouplecooks.com/wp-content/uploads/2022/01/Iced-Americano-008s.jpg',
  //   },
  //   {
  //     title: 'Affogato',
  //     type: 'hot',
  //     description: 'A shot of espresso with vanilla ice cream',
  //     price: '₹ 250',
  //     imageUrl: 'https://www.thespruceeats.com/thmb/5PcCBEaUd1U1eFxfcKKPLVnZzfA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/affogato-4776668-hero-08-40d7a68d12ba46f48eaea3c43aba715c.jpg',
  //   },
  // ];







}
