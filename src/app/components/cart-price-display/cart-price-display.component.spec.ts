import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartPriceDisplayComponent } from './cart-price-display.component';

describe('CartPriceDisplayComponent', () => {
  let component: CartPriceDisplayComponent;
  let fixture: ComponentFixture<CartPriceDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartPriceDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartPriceDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
