import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColdcoffeeComponent } from './coldcoffee.component';

describe('ColdcoffeeComponent', () => {
  let component: ColdcoffeeComponent;
  let fixture: ComponentFixture<ColdcoffeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColdcoffeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColdcoffeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
