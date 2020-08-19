import {ShoeProductDetailsComponent} from 'src/app/components/product-details/shoe-product-details/shoe-product-details.component';
import {CaseProductDetailsComponent} from 'src/app/components/product-details/case-product-details/case-product-details.component';
import {ShoeUnitSelectorComponent} from 'src/app/components/unit-selector/shoe-unit-selector/shoe-unit-selector.component';
import {CaseUnitSelectorComponent} from 'src/app/components/unit-selector/case-unit-selector/case-unit-selector.component';
import {ProductDetailsComponent} from 'src/app/components/product-details/product-details.component';
import {UnitSelectorComponent} from 'src/app/components/unit-selector/unit-selector.component';
import {ContainerDirective} from 'src/app/directives/container/container.directive';
import {ProductService} from 'src/app/services/product/product.service';
import {CartService} from 'src/app/services/cart/cart.service';
import {ProductShoe} from 'src/app/model/Product/ProductShoe';
import {ProductCase} from 'src/app/model/Product/ProductCase';
import {UnitListing} from 'src/app/model/Unit/UnitListing';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Product} from 'src/app/model/Product/Product';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {
  Component,
  OnInit,
  OnDestroy,
  ComponentFactoryResolver,
  ComponentFactory,
  ComponentRef,
  ViewChildren,
  QueryList,
} from '@angular/core';

@Component({
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass'],
  selector: 'app-product',
})
export class ProductPageComponent implements OnDestroy, OnInit {
  @ViewChildren(ContainerDirective)
  containers: QueryList<ContainerDirective>;

  productDetails: ComponentRef<ProductDetailsComponent>;
  unitSelector: ComponentRef<UnitSelectorComponent>;

  private productSubscription: Subscription;
  private routeSubscription: Subscription;

  selectedUnit: UnitListing;
  product: Product;
  loading = true;
  id: string;

  // Properties
  get isAvailable(): boolean {
    return this.selectedUnit !== undefined && this.selectedUnit.available;
  }

  // Event handlers
  onUnitSelected(selectedUnit: UnitListing) {
    this.selectedUnit = selectedUnit;
  }

  // Methods
  createProductDetailsComponent() {
    let factory: ComponentFactory<ProductDetailsComponent>;

    if (this.product instanceof ProductShoe) {
      factory = this.resolver.resolveComponentFactory(
        ShoeProductDetailsComponent
      );
    }

    if (this.product instanceof ProductCase) {
      factory = this.resolver.resolveComponentFactory(
        CaseProductDetailsComponent
      );
    }

    if (!factory) {
      console.warn('Unknown product type for unit selector!');
      return;
    }

    this.productDetails = this.containers
      .toArray()[0]
      .viewContainerRef.createComponent(factory);

    this.productDetails.instance.setProduct(this.product);
  }

  createUnitSelectorComponent() {
    let factory: ComponentFactory<UnitSelectorComponent>;

    if (this.product instanceof ProductShoe) {
      factory = this.resolver.resolveComponentFactory(
        ShoeUnitSelectorComponent
      );
    }

    if (this.product instanceof ProductCase) {
      factory = this.resolver.resolveComponentFactory(
        CaseUnitSelectorComponent
      );
    }

    if (!factory) {
      console.warn('Unknown product type for unit selector!');
      return;
    }

    this.unitSelector = this.containers
      .toArray()[1]
      .viewContainerRef.createComponent(factory);

    this.unitSelector.instance.onSelected.subscribe((x: UnitListing) =>
      this.onUnitSelected(x)
    );
    this.unitSelector.instance.setUnits(this.product.units);
  }

  subscribeToProduct() {
    this.productSubscription = this.productService.product(this.id).subscribe(
      result => {
        this.product = result;
        this.createUnitSelectorComponent();
        this.createProductDetailsComponent();
      },
      e => {},
      () => (this.loading = false)
    );
  }

  addToCart() {
    this.cartService.AddProduct(this.selectedUnit.id);
    this.router.navigate(['/cart']);
  }

  // Lifecycle
  ngOnDestroy() {
    this.productSubscription?.unsubscribe();
    this.routeSubscription?.unsubscribe();
  }

  ngOnInit() {
    this.routeSubscription = this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.id = params.get('id');
        this.subscribeToProduct();
      }
    );
  }

  constructor(
    private resolver: ComponentFactoryResolver,
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
}
