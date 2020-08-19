import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

// Pages
import {CheckoutPageComponent} from './pages/checkout/checkout.component';
import {ProductPageComponent} from './pages/product/product.component';
import {CatalogPageComponent} from './pages/catalog/catalog.component';
import {ContactPageComponent} from './pages/contact/contact.component';
import {IndexPageComponent} from './pages/index/index.component';
import {AboutPageComponent} from './pages/about/about.component';
import {OrderPageComponent} from './pages/order/order.component';
import {CartPageComponent} from './pages/cart/cart.component';

// Components
import {CaseProductDetailsComponent} from './components/product-details/case-product-details/case-product-details.component';
import {ShoeProductDetailsComponent} from './components/product-details/shoe-product-details/shoe-product-details.component';
import {CaseUnitSelectorComponent} from './components/unit-selector/case-unit-selector/case-unit-selector.component';
import {ShoeUnitSelectorComponent} from './components/unit-selector/shoe-unit-selector/shoe-unit-selector.component';
import {LoadingIndicatorComponent} from './components/loading-indicator/loading-indicator.component';
import {LoadingButtonComponent} from './components/loading-button/loading-button.component';
import {CustomerFormComponent} from './components/customer-form/customer-form.component';
import {CheckoutFormComponent} from './components/checkout-form/checkout-form.component';
import {ShippingFormComponent} from './components/shipping-form/shipping-form.component';
import {CartProductComponent} from './components/cart-product/cart-product.component';
import {CartDisplayComponent} from './components/cart-display/cart-display.component';
import {AddressFormComponent} from './components/address-form/address-form.component';
import {CartButtonComponent} from './components/cart-button/cart-button.component';
import {ImageFrameComponent} from './components/image-frame/image-frame.component';
import {CartPriceComponent} from './components/cart-price/cart-price.component';
import {FooterComponent} from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header.component';
import {HeroComponent} from './components/hero/hero.component';

// Directives
import {ContainerDirective} from './directives/container/container.directive';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';
import { CartPriceDisplayComponent } from './components/cart-price-display/cart-price-display.component';
import { CountrySelectorComponent } from './components/country-selector/country-selector.component';

@NgModule({
  declarations: [
    AppComponent,

    HeroComponent,
    FooterComponent,
    HeaderComponent,
    CartPriceComponent,
    ImageFrameComponent,
    CartButtonComponent,
    CartProductComponent,
    CartDisplayComponent,
    AddressFormComponent,
    CheckoutFormComponent,
    ShippingFormComponent,
    CustomerFormComponent,
    LoadingButtonComponent,
    LoadingIndicatorComponent,
    ShoeUnitSelectorComponent,
    CaseUnitSelectorComponent,
    ShoeProductDetailsComponent,
    CaseProductDetailsComponent,

    CheckoutPageComponent,
    ProductPageComponent,
    CatalogPageComponent,
    ContactPageComponent,
    IndexPageComponent,
    AboutPageComponent,
    OrderPageComponent,
    CartPageComponent,

    ContainerDirective,

    PaymentFormComponent,

    CartPriceDisplayComponent,

    CountrySelectorComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
