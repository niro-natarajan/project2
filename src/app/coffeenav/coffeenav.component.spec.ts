import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeenavComponent } from './coffeenav.component';

describe('CoffeenavComponent', () => {
  let component: CoffeenavComponent;
  let fixture: ComponentFixture<CoffeenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoffeenavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoffeenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
