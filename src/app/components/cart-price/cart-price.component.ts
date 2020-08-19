import {CartItemLoaderService} from 'src/app/services/cart-item-loader/cart-item-loader.service';
import {CartPriceDisplayComponent} from '../cart-price-display/cart-price-display.component';
import {Component, OnInit, OnDestroy, Input, ViewChild} from '@angular/core';
import {ShippingService} from 'src/app/services/shipping/shipping.service';
import {PaymentService} from 'src/app/services/payment/payment.service';
import {CartListing} from 'src/app/model/Cart/CartListing';
import {Address} from 'src/app/model/Address/Address';
import {Subscription} from 'rxjs';

@Component({
  templateUrl: './cart-price.component.html',
  styleUrls: ['./cart-price.component.sass'],
  selector: 'app-cart-price',
})
export class CartPriceComponent implements OnInit, OnDestroy {
  @ViewChild('price_display') price_display: CartPriceDisplayComponent;

  private _shippingType: string;
  private _showShipping = true;
  private _showSubtotal = true;
  private _address: Address;
  private _showTax = true;
  private _manual = false;

  private loadingSubscription: Subscription;
  private itemsSubscription: Subscription;
  private items: Array<CartListing>;
  private loading = true;

  subtotalPrice: number;
  shippingPrice: number;
  hstPrice: number;
  pstPrice: number;

  // Input Properties
  @Input()
  set showShipping(value: boolean) {
    this._showShipping = value;
    this.loadShipping();
  }

  get showShipping() {
    return this._showShipping;
  }

  @Input()
  set showSubtotal(value: boolean) {
    this._showSubtotal = value;
    this.loadSubtotal();
  }

  get showSubtotal() {
    return this._showSubtotal;
  }

  @Input()
  set shippingType(value: string) {
    this._shippingType = value;
    this.loadShipping();
  }

  @Input()
  set address(value: Address) {
    this._address = value;
    this.loadShipping();
  }

  @Input()
  set showTax(value: boolean) {
    this._showTax = value;
    this.loadTax();
  }

  get showTotal() {
    return this._showShipping && this._showSubtotal && this._showTax;
  }

  get showTax() {
    return this._showTax;
  }

  @Input()
  set Manual(value: boolean) {
    this._manual = value;
  }

  // Display Properties
  @Input()
  set Subtotal(value: number) {
    if (!this._manual) return;
    this.subtotalPrice = value;
  }

  get Subtotal(): number {
    if (!this.items || this.items.length === 0 || this.loading) {
      return undefined;
    }

    return Math.round(this.subtotalPrice) / 100;
  }

  @Input()
  set Shipping(value: number) {
    if (!this._manual) return;
    this.shippingPrice = value;
  }

  get Shipping(): number {
    if (this.loading || this.shippingPrice === undefined) return undefined;
    return Math.round(this.shippingPrice) / 100;
  }

  get Total(): number {
    if (this.loading) return undefined;

    let result = this.subtotalPrice;
    if (result === undefined) return undefined;

    if (this._showShipping) {
      if (this.shippingPrice === undefined) return undefined;
      result += this.shippingPrice;
    }

    if (this._showTax) {
      if (this.hstPrice === undefined) return undefined;
      result += this.hstPrice;
    }

    return Math.round(result) / 100;
  }

  @Input()
  set HST(value: number) {
    if (!this._manual) return;
    this.hstPrice = value;
  }

  get HST(): number {
    if (this.loading || this.hstPrice === undefined) {
      return undefined;
    }
    return Math.round(this.hstPrice) / 100;
  }

  @Input()
  set PST(value: number) {
    if (!this._manual) return;
    this.pstPrice = value;
  }

  get PST(): number {
    if (this.loading || this.pstPrice === undefined) {
      return undefined;
    }
    return Math.round(this.pstPrice) / 100;
  }

  // Methods
  loadSubtotal() {
    if (this._manual) return;
    this.subtotalPrice = this.items?.reduce((sum, curr) => {
      return sum + curr.unit.price.price * curr.quantity;
    }, 0);
    this.loadShipping();
  }

  loadShipping() {
    if (this._manual) return;
    if (!this._showShipping) {
      return (this.shippingPrice = 0);
    }

    this.shippingPrice = undefined;

    if (this._shippingType === undefined) return;
    if (this._address === undefined) return;

    const type = this._shippingType;
    const units = this.items.map(x => x.unit.id);

    this.ShippingService.price(type, units, this._address).subscribe(x => {
      this.shippingPrice = x;
      this.loadTax();
    });
  }

  loadTax() {
    if (this._manual) return;
    if (this.shippingPrice === undefined) return;

    this.hstPrice = undefined;

    if (this._address === undefined) return;
    if (!this._showTax) return;

    const subtotal = this.subtotalPrice;
    const shipping = this.shippingPrice;

    this.PaymentService.tax(this._address, subtotal + shipping).subscribe(
      x => {
        this.pstPrice = x.ProvincialTax;
        this.hstPrice = x.FederalTax;
      },
      error => {
        console.log(error);
      }
    );
  }

  // Lifecycle
  ngOnDestroy(): void {
    this.itemsSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.itemsSubscription = this.CartItemLoaderService.Units.subscribe(
      value => {
        this.items = value;
        this.loadSubtotal();
      }
    );

    this.loadingSubscription = this.CartItemLoaderService.Loading.subscribe(
      value => {
        this.loading = value;
        this.loadSubtotal();
      }
    );
  }

  // Constructor
  constructor(
    private CartItemLoaderService: CartItemLoaderService,
    private ShippingService: ShippingService,
    private PaymentService: PaymentService
  ) {}
}
