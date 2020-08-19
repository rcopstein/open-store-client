import {ProductDetailsComponent} from '../product-details.component';
import {ProductCase} from 'src/app/model/Product/ProductCase';
import {Component} from '@angular/core';

@Component({
  templateUrl: './case-product-details.component.html',
  styleUrls: ['./case-product-details.component.sass'],
  selector: 'app-case-product-details',
})
export class CaseProductDetailsComponent extends ProductDetailsComponent {
  private product: ProductCase;

  get Artist() {
    return this.product?.artist;
  }

  setProduct(product: ProductCase) {
    this.product = product;
  }

  constructor() {
    super();
  }
}
