import {ProductDetailsComponent} from '../product-details.component';
import {ProductShoe} from 'src/app/model/Product/ProductShoe';
import {Component} from '@angular/core';

@Component({
  templateUrl: './shoe-product-details.component.html',
  styleUrls: ['./shoe-product-details.component.sass'],
  selector: 'app-shoe-product-details',
})
export class ShoeProductDetailsComponent extends ProductDetailsComponent {
  private product: ProductShoe;

  get Artist() {
    return this.product?.artist;
  }

  setProduct(product: ProductShoe) {
    this.product = product;
  }

  constructor() {
    super();
  }
}
