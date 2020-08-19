import {Component, Input, Output, EventEmitter} from '@angular/core';
import {UnitShoeListing} from 'src/app/model/Unit/UnitShoeListing';
import {UnitCaseListing} from 'src/app/model/Unit/UnitCaseListing';
import {CartService} from 'src/app/services/cart/cart.service';
import {CartListing} from 'src/app/model/Cart/CartListing';

@Component({
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.sass'],
  selector: 'app-cart-product',
})
export class CartProductComponent {
  @Input() showQuantityControls = true;
  @Input() showOutOfStock = true;
  @Input() showRemove = true;
  @Input() item: CartListing;

  @Output() onQuantityChanged: EventEmitter<number>;
  @Output() onRemove: EventEmitter<void>;

  // Properties
  get showIncrease(): boolean {
    return this.item.quantity < this.item.unit.quantity;
  }

  get showDecrease(): boolean {
    return this.item.quantity > 1;
  }

  get availability(): string {
    if (this.showOutOfStock) {
      if (this.item.OutOfStock) return 'Out of Stock!';
      else if (this.item.QuantityExceeded) {
        return 'Maximum available quantity exceeded!';
      }
    }

    return undefined;
  }

  get details(): string {
    if (this.item.unit instanceof UnitShoeListing) {
      return `Size: ${this.item.unit.size}`;
    }

    if (this.item.unit instanceof UnitCaseListing) {
      return `${this.item.unit.device}`;
    }

    return undefined;
  }

  get price(): string {
    if (this.item.unit.price !== undefined) {
      return `${this.item.unit.price.currency}$${
        this.item.unit.price.price / 100
      }`;
    }

    return undefined;
  }

  // Methods
  onIncreaseClicked(): void {
    if (!this.showIncrease) return;
    this.onQuantityChanged.emit(this.item.quantity + 1);
  }

  onDecreaseClicked(): void {
    if (!this.showDecrease) return;
    this.onQuantityChanged.emit(this.item.quantity - 1);
  }

  onRemoveClicked(): void {
    this.onRemove.emit();
  }

  constructor(private cartService: CartService) {
    this.onQuantityChanged = new EventEmitter<number>();
    this.onRemove = new EventEmitter<void>();
  }
}
