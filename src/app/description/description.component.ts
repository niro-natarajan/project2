import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrl: './description.component.scss'
})
export class DescriptionComponent implements OnChanges{


  @Input() item='from des';

  // @Input() itemm: string = '';

ngOnChanges(changes: SimpleChanges): void {
  console.log("not changed");
  throw new Error('Method not implemented.');
 
}






}
