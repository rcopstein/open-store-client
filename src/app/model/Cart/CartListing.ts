import {UnitListing} from '../Unit/UnitListing';
import {CartItem} from './CartItem';

export class CartListing {
  get QuantityExceeded() {
    return this.unit.quantity < this.quantity;
  }

  get OutOfStock() {
    return this.unit.quantity === 0;
  }

  toCartItem(): CartItem {
    return new CartItem(this.unit.id, this.quantity);
  }

  constructor(
    public unit: UnitListing,
    public quantity: number,
    public order: number
  ) {}
}
