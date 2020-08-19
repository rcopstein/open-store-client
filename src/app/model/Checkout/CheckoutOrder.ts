import {Address} from '../Address/Address';
import {CartItem} from '../Cart/CartItem';

export class CheckoutOrder {
  items: Array<CartItem>;
  shipping_type: string;

  constructor(
    public name: string,
    public email: string,
    public billing_address: Address,
    public shipping_address: Address
  ) {}
}
