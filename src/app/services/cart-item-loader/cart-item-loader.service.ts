import {CartListing} from 'src/app/model/Cart/CartListing';
import {CartItem} from 'src/app/model/Cart/CartItem';
import {BehaviorSubject, Observable} from 'rxjs';
import {UnitService} from '../unit/unit.service';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartItemLoaderService {
  private items: BehaviorSubject<Array<CartListing>>;
  private loading: BehaviorSubject<boolean>;
  private loadCount: number;
  private order: number;

  // Private Methods
  private ChangeLoad(value: 1 | -1) {
    this.loadCount += value;
    this.loading.next(this.loadCount > 0);
  }

  // Public Methods
  SetCartItemQuantity(item: string, quantity: number) {
    const cartItem = this.items.value.find(x => x.unit.id === item);
    if (!cartItem) return;

    cartItem.quantity = quantity;
  }

  RemoveCartItem(item: string) {
    const index = this.items.value.findIndex(x => x.unit.id === item);
    if (index === -1) return;
    this.items.value.splice(index, 1);
    this.items.next(this.items.value);
  }

  AddCartItem(item: CartItem) {
    this.ChangeLoad(1);

    const quantity = item.quantity;
    const order = this.order;
    const id = item.unit;

    this.order += 1;

    const subscription = this.unitService.unit(id).subscribe(
      unitListing => {
        this.items.value.push(new CartListing(unitListing, quantity, order));
        this.items.value.sort((a, b) => a.order - b.order);
        this.items.next(this.items.value);
      },
      error => {
        console.error(`Failed to retrieve unit '${id}' with error ${error}`);
      },
      () => {
        subscription.unsubscribe();
        this.ChangeLoad(-1);
      }
    );
  }

  // Properties
  get Units(): Observable<Array<CartListing>> {
    return this.items.asObservable();
  }

  get Loading(): Observable<boolean> {
    return this.loading.asObservable();
  }

  constructor(private unitService: UnitService) {
    this.loading = new BehaviorSubject(false);
    this.items = new BehaviorSubject([]);
    this.loadCount = 0;
    this.order = 0;
  }
}
