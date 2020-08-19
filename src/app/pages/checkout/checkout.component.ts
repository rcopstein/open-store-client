import {CartItemLoaderService} from 'src/app/services/cart-item-loader/cart-item-loader.service';
import {CheckoutFormComponent} from 'src/app/components/checkout-form/checkout-form.component';
import {ShippingFormComponent} from 'src/app/components/shipping-form/shipping-form.component';
import {PaymentFormComponent} from 'src/app/components/payment-form/payment-form.component';
import {CartPriceComponent} from 'src/app/components/cart-price/cart-price.component';
import {CountryService} from 'src/app/services/country/country.service';
import {CheckoutOrder} from 'src/app/model/Checkout/CheckoutOrder';
import {OrderService} from 'src/app/services/order/order.service';
import {CartService} from 'src/app/services/cart/cart.service';
import {CartListing} from 'src/app/model/Cart/CartListing';
import {Router, ActivatedRoute} from '@angular/router';
import {CartItem} from 'src/app/model/Cart/CartItem';
import {Failure} from 'src/app/failure/Failure';
import {Subscription} from 'rxjs';
import {
  AfterViewInit,
  Component,
  ViewChild,
  OnDestroy,
  OnInit,
} from '@angular/core';

@Component({
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.sass'],
  providers: [CartItemLoaderService],
  selector: 'app-page-checkout',
})
export class CheckoutPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('checkout_form') checkoutForm: CheckoutFormComponent;
  @ViewChild('shipping_form') shippingForm: ShippingFormComponent;
  @ViewChild('payment_form') paymentForm: PaymentFormComponent;
  @ViewChild('price') price: CartPriceComponent;

  itemsSubscription: Subscription;
  pageLoading: boolean;
  items: CartListing[];
  pageError: string;
  tab = -1;

  isPreLoad?: boolean = undefined;
  checkoutOrder: CheckoutOrder;
  shippingType: string;
  orderId: string;
  order: any;

  // Properties
  subtotal: number;
  shipping: number;
  hst: number;
  pst: number;

  // Event handler
  onItemsChanged(value: CartListing[]) {
    this.items = value;
  }

  onNext() {
    if (this.tab === 0) {
      this.submitCheckout();
      return;
    }

    if (this.tab === 1) {
      this.submitOrder();
      return;
    }

    if (this.tab === 2) {
      this.submitPayment();
      return;
    }
  }

  // Submission
  submitCheckout() {
    const checkoutOrder = this.checkoutForm.onSubmit();
    if (checkoutOrder === undefined) return;

    this.price.address = checkoutOrder.shipping_address;
    this.price.shippingType = this.shippingType;

    const items = this.items.map(x => x.toCartItem());
    this.checkoutOrder = checkoutOrder;
    this.checkoutOrder.items = items;
    this.tab = 1;
  }

  submitPayment() {
    if (this.pageLoading) return;

    // Set page to loading
    this.pageLoading = true;

    // Submit payment
    this.paymentForm.submitPayment()?.then(
      result => {
        this.success();
      },
      error => {
        this.pageError =
          'Something went wrong trying to authorize your card. Please try again.';
        console.log(error);
        this.pageLoading = false;
      }
    );
  }

  submitOrder() {
    if (this.pageLoading) return;

    // Set page to loading
    this.pageLoading = true;

    // Attach products to model
    this.checkoutOrder.shipping_type = this.shippingType;

    // Attach country to model
    const country = this.countryService.getCountry().name;
    this.checkoutOrder.shipping_address.country = country;
    this.checkoutOrder.billing_address.country = country;

    // Create order
    this.orderService.insert(this.checkoutOrder).subscribe(
      (order_result: any) => {
        this.orderId = order_result.id;

        // Add order id to the address bar
        this.router.navigate(['/checkout'], {
          queryParams: {order: order_result.id},
        });

        // Add values to payment form
        this.paymentForm.paymentSecret =
          order_result.billing.payment.param.clientSecret;

        // Add tax to price
        this.price.Manual = true;
        this.price.HST =
          order_result.billing.tax.harmonizedTax ||
          order_result.billing.tax.federalTax;
        this.price.PST = order_result.billing.tax.provincialTax;

        this.pageLoading = false;
        this.tab = 2;
      },

      (error: Failure) => {
        this.pageError = error.message;
        this.pageLoading = false;
      }
    );
  }

  success() {
    this.router.navigate(['/order', this.orderId]);
  }

  // Page startup
  loadItems(items: CartItem[]) {
    // Return to cart in case it is empty
    if (items.length === 0) {
      this.router.navigate(['/cart']);
      return;
    }

    // Load all items from cart
    this.itemsSubscription = this.cartItemLoaderService.Units.subscribe(x =>
      this.onItemsChanged(x)
    );
    items.forEach(x => this.cartItemLoaderService.AddCartItem(x));

    // Move to tab
    this.tab = 0;
  }

  loadOrder(orderId: string) {
    if (!this.isPreLoad) {
      // I'm already in the page, no need to reload
      return;
    }

    this.orderService.get(orderId).subscribe(
      order => {
        this.order = order;

        // Move to result if payment was already made
        if (order.billing.payment.status !== 'CREATED') {
          this.success();
          return;
        }

        // Push items into list
        const items = [];
        for (let entry of order.items) {
          items.push(new CartItem(entry.unit.id, entry.quantity));
        }

        // Set manual price details
        if (this.isPreLoad) {
          this.subtotal = this.order.items.reduce(
            (x, y) => x + y.unit.price.price,
            0
          );
          this.shipping = this.order.shipping.price.price;

          this.hst =
            this.order.billing.tax.harmonizedTax ||
            this.order.billing.tax.federalTax;
          this.pst = this.order.billing.tax.provincialTax;
        }

        // Set payment form parameters
        this.paymentForm.paymentSecret =
          order.billing.payment.param.clientSecret;
        this.loadItems(items);
        this.tab = 2;
      },
      error => {
        if (error.message) {
          this.pageError = error.message;
        } else {
          this.pageError = 'Unexpected error';
        }
      }
    );
  }

  // Lifecycle
  ngAfterViewInit(): void {
    // Set manual mode
    this.price.Manual = this.isPreLoad;

    // Listen for shipping type changes
    this.shippingForm.shippingType.subscribe(x => {
      this.shippingType = x;
      if (this.tab > 0) {
        this.price.shippingType = this.shippingType;
      }
    });
    this.shippingType = this.shippingForm._value;
  }

  ngOnDestroy(): void {
    if (this.itemsSubscription !== undefined) {
      this.itemsSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      if (this.isPreLoad === undefined) {
        if (params.has('order')) {
          this.orderId = params.get('order');
          this.isPreLoad = true;

          this.loadOrder(this.orderId);
        } else {
          const items = this.cartService.All();
          this.isPreLoad = false;

          this.loadItems(items);
        }
      }
    });
  }

  // Constructor
  constructor(
    private cartItemLoaderService: CartItemLoaderService,
    private countryService: CountryService,
    private orderService: OrderService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.items = new Array<CartListing>();
    router.onSameUrlNavigation = 'ignore';
  }
}
