import {CartItemLoaderService} from 'src/app/services/cart-item-loader/cart-item-loader.service';
import {CartService} from 'src/app/services/cart/cart.service';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {CartListing} from 'src/app/model/Cart/CartListing';
import {Subscription} from 'rxjs';

@Component({
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass'],
  providers: [CartItemLoaderService],
  selector: 'app-cart-page',
})
export class CartPageComponent implements OnDestroy, OnInit {
  itemsSubscription: Subscription;
  items: CartListing[];
  empty: boolean;

  // Properties
  get CanCheckout() {
    return !this.items.some(x => x.OutOfStock || x.QuantityExceeded);
  }

  // Event handlers
  onItemsChanged(items: CartListing[]) {
    this.items = items;
  }

  // Methods
  quantityChanged(value: [string, number]) {
    if (value[1] === 0) this.removeProduct(value[0]);
    else {
      this.CartItemLoaderService.SetCartItemQuantity(value[0], value[1]);
      this.cartService.SetProductQuantity(value[0], value[1]);
    }
  }

  removeProduct(item: string) {
    this.CartItemLoaderService.RemoveCartItem(item);
    this.cartService.RemoveProduct(item);

    this.empty = this.cartService.All().length === 0;
  }

  // Lifecycle
  ngOnDestroy(): void {
    this.itemsSubscription.unsubscribe();
  }

  ngOnInit(): void {
    const items = this.cartService.All();
    if (items.length === 0) this.empty = true;

    this.itemsSubscription = this.CartItemLoaderService.Units.subscribe(x =>
      this.onItemsChanged(x)
    );
    items.forEach(x => this.CartItemLoaderService.AddCartItem(x));
  }

  // Constructor
  constructor(
    private CartItemLoaderService: CartItemLoaderService,
    private cartService: CartService
  ) {}
}
