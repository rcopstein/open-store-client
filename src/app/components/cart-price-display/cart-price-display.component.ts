import {Component, Input} from '@angular/core';

@Component({
  templateUrl: './cart-price-display.component.html',
  styleUrls: ['./cart-price-display.component.sass'],
  selector: 'app-cart-price-display',
})
export class CartPriceDisplayComponent {
  @Input() showSubtotal: boolean;
  @Input() showShipping: boolean;
  @Input() showTotal: boolean;
  @Input() showTax: boolean;

  @Input() subtotal: number;
  @Input() shipping: number;
  @Input() hst: number;
  @Input() pst: number;

  private formatNumber(value: number): string {
    if (value === undefined || isNaN(value)) return '-';
    if (value === 0) return 'FREE';
    return `\$${value}`;
  }

  get Subtotal() {
    return this.formatNumber(this.subtotal);
  }

  get Shipping() {
    return this.formatNumber(this.shipping);
  }

  get HST() {
    return this.formatNumber(this.hst);
  }

  get PST() {
    return this.formatNumber(this.pst);
  }

  get Total() {
    const total = this.subtotal + this.shipping + this.hst;
    return this.formatNumber(total);
  }
}
