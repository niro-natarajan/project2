import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { products } from '../services/attribute';


interface CheckboxItem {
  name: string;
  checked: boolean
}

@Component({
  selector: 'app-coffeenav',
  templateUrl: './coffeenav.component.html',
  styleUrl: './coffeenav.component.scss'
})
export class CoffeenavComponent implements OnInit {

  //filter
  @Input() menuList: products[] = []; // Input property to receive menuList from parent component
  // filteredCoffee: products[] = [];

  // //emiting to hotclassic
  // @Output() filteredByCoffeeTypesChanged: EventEmitter<products[]> = new EventEmitter<products[]>();
  // @Output() filteredByPriceRangeChanged: EventEmitter<products[]> = new EventEmitter<products[]>();
  // @Output() filteredCoffeeChanged: EventEmitter<products[]> = new EventEmitter<products[]>();


  // @Output() filteredItemsEvent = new EventEmitter<products[]>();

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.menuList, "----- menulist from hotclassic");
  }

  coffees: CheckboxItem[] = [
    { name: 'Hot Coffee', checked: false },
    { name: 'Cold Coffee', checked: false },
  ];

  priceRanges: CheckboxItem[] = [
    { name: '> 200', checked: false },
    { name: '200 - 300', checked: false },
    { name: '500 <', checked: false },
  ];

  // Filter function
  // applyFilters(): void {
  //   // // //filter coffee types
  //   // this.filterCoffeeTypes();
  //   // //filter price range
  //   // this.filterPriceRange();

  //   const filteredByCoffeeTypes = this.filterCoffeeTypes();
  //   const filteredByPriceRange = this.filterPriceRange();

  //   // Merge the filtered results
  //   this.filteredCoffee = this.menuList.filter(item =>
  //     filteredByCoffeeTypes.includes(item) && filteredByPriceRange.includes(item)
  //   );

  //   console.log('Filtered coffee:', this.filteredCoffee);

  //   // Emit filtered items to hotclassic
  //   this.filteredByCoffeeTypesChanged.emit(filteredByCoffeeTypes);
  //   this.filteredByPriceRangeChanged.emit(filteredByPriceRange);
  //   this.filteredCoffeeChanged.emit(this.filteredCoffee);
  //   // this.filteredItemsEvent.emit(this.filteredCoffee); 


  // }


  // filterCoffeeTypes() {
  //   // Apply coffee type filter
  //   const selectedCoffees = this.coffees.filter(coffee => coffee.checked).map(coffee => coffee.name);
  //   console.log(selectedCoffees, "---------SELECTED COFFEE");

  //   //filter coffee types
  //   const filteredItems: products[] = [];
  //   if (selectedCoffees.length > 0) {
  //     this.menuList.forEach(item => {

  //       if (selectedCoffees.includes('Hot Coffee') && item.type === 'hot') {
  //         filteredItems.push(item);
  //       } else if (selectedCoffees.includes('Cold Coffee') && item.type === 'cold') {
  //         filteredItems.push(item);
  //       }
  //     });
  //     console.log(filteredItems, "---------FILTERED ITEMS");
  //   }
  //   return filteredItems;
  // }

  // filterPriceRange(): products[] {
  //   // Apply price filter
  //   const selectedPriceRanges = this.priceRanges.filter(price => price.checked).map(price => price.name);
  //   console.log(selectedPriceRanges, "-------Selected price range");

  //   const rangeItems: products[] = [];
  //   if (selectedPriceRanges.length > 0) {


  //     this.menuList.forEach(item => {
  //       const priceString = item.price.replace(/[^\d.-]/g, ''); // Remove non-numeric characters
  //       const price = parseFloat(priceString);

  //       // console.log(item.price, "Item price");
  //       // console.log(price, "Parsed price");

  //       if (!isNaN(price)) {
  //         if (selectedPriceRanges.includes('> 200') && price < 200) {
  //           rangeItems.push(item);
  //         } else if (selectedPriceRanges.includes('200 - 300') && price >= 200 && price <= 300) {
  //           rangeItems.push(item);
  //         } else if (selectedPriceRanges.includes('500 <') && price > 500) {
  //           rangeItems.push(item);
  //         }
  //       }
  //     });

  //     console.log(rangeItems, "---------FILTERED ITEMS BY PRICE RANGE");
  //   }
  //   return rangeItems;

  // }




  // mediums: CheckboxItem[] = [
  //   { name: 'Strong', checked: false },
  //   { name: 'Light', checked: false },
  //   { name: 'Medium', checked: false },
  // ];

  // levels: CheckboxItem[] = [
  //   { name: 'Less Sugar', checked: false },
  //   { name: 'Medium Sugar', checked: false },
  //   { name: 'More Sugar', checked: false },
  // ];



}
