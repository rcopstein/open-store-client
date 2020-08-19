import {CartItem} from 'src/app/model/Cart/CartItem';
import {CookieService} from 'ngx-cookie-service';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Array<CartItem>;
  private COOKIE_NAME = 'cart';

  public SetProductQuantity(unit: string, quantity: number) {
    const item = this.cart.find(x => x.unit === unit);

    if (item) item.quantity = quantity;
    else this.cart.push(new CartItem(unit, quantity));

    this.SaveCart();
  }

  public RemoveProduct(unit: string) {
    const index = this.cart.findIndex(x => x.unit === unit);
    if (index === -1) return;

    this.cart.splice(index, 1);
    this.SaveCart();
  }

  public AddProduct(unit: string) {
    const item = this.cart.find(x => x.unit === unit);

    if (item) item.quantity++;
    else this.cart.push(new CartItem(unit, 1));

    this.SaveCart();
  }

  public All(): Array<CartItem> {
    return this.cart;
  }

  public Length(): number {
    return this.cart.length;
  }

  private SaveCart() {
    if (this.cart.length === 0) return this.Clear();
    const content = this.cart.map(x => x.Serialize()).join(';');
    this.cookieService.set(this.COOKIE_NAME, content);
  }

  private LoadCart() {
    if (!this.cookieService.check(this.COOKIE_NAME)) return;
    let values: string[];

    try {
      const cookie = this.cookieService.get(this.COOKIE_NAME);
      values = cookie.split(';');
    } catch (e) {
      console.warn("Invalid value for 'cart' cookie");
      this.Clear();
      return;
    }

    for (let value of values) {
      const item = CartItem.Deserialize(value);
      if (item === undefined || item.unit === undefined) return this.Clear();
      if (item.quantity > 0) this.cart.push(item);
    }
  }

  public Clear() {
    this.cart = new Array<CartItem>();
    this.cookieService.delete(this.COOKIE_NAME);
  }

  constructor(private cookieService: CookieService) {
    this.cart = new Array<CartItem>();
    this.LoadCart();
  }
}
