import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotclassicsComponent } from './hotclassics.component';

describe('HotclassicsComponent', () => {
  let component: HotclassicsComponent;
  let fixture: ComponentFixture<HotclassicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HotclassicsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HotclassicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
