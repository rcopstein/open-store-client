import {ProductService} from 'src/app/services/product/product.service';
import {ProductListing} from 'src/app/model/Product/ProductListing';
import {ProductType} from 'src/app/model/Product/ProductType';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';

@Component({
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.sass'],
  selector: 'app-shoes-page',
})
export class CatalogPageComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  products: Array<ProductListing>;

  get Shoes() {
    return this.products.filter(x => x.type === ProductType.SHOE);
  }

  get Cases() {
    return this.products.filter(x => x.type === ProductType.CASE);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.productService.products().subscribe(products => {
      this.products = products;
    });
  }

  constructor(private productService: ProductService) {}
}
