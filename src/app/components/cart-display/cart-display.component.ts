import {CartItemLoaderService} from 'src/app/services/cart-item-loader/cart-item-loader.service';
import {CartListing} from 'src/app/model/Cart/CartListing';
import {Subscription} from 'rxjs';
import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';

@Component({
  templateUrl: './cart-display.component.html',
  styleUrls: ['./cart-display.component.sass'],
  selector: 'app-cart-display',
})
export class CartDisplayComponent implements OnInit, OnDestroy {
  @Output() onQuantityChanged: EventEmitter<[string, number]>;
  @Output() onRemove: EventEmitter<string>;

  @Input() showQuantityControls: boolean = true;
  @Input() showRemove: boolean = true;

  loadingSubscription: Subscription;
  itemsSubscription: Subscription;

  items: Array<CartListing>;
  loading: boolean;

  quantityChanged(item: string, quantity: number) {
    this.onQuantityChanged.emit([item, quantity]);
  }

  removeItem(item: string) {
    this.onRemove.emit(item);
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
    this.itemsSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.itemsSubscription = this.cartItemLoaderService.Units.subscribe(
      value => (this.items = value)
    );

    this.loadingSubscription = this.cartItemLoaderService.Loading.subscribe(
      value => (this.loading = value)
    );
  }

  constructor(private cartItemLoaderService: CartItemLoaderService) {
    this.onQuantityChanged = new EventEmitter<[string, number]>();
    this.onRemove = new EventEmitter<string>();
  }
}
