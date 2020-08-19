import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';

// Pages
import {CheckoutPageComponent} from './pages/checkout/checkout.component';
import {ProductPageComponent} from './pages/product/product.component';
import {CatalogPageComponent} from './pages/catalog/catalog.component';
import {ContactPageComponent} from './pages/contact/contact.component';
import {OrderPageComponent} from './pages/order/order.component';
import {IndexPageComponent} from './pages/index/index.component';
import {AboutPageComponent} from './pages/about/about.component';
import {CartPageComponent} from './pages/cart/cart.component';

// Routes
const routes: Routes = [
  {
    path: 'order',
    children: [
      {path: ':id', component: OrderPageComponent},
      {path: '**', redirectTo: '/cart'},
    ],
  },
  {
    path: 'checkout',
    component: CheckoutPageComponent,
  },
  {
    path: 'catalog',
    children: [
      {path: ':id', component: ProductPageComponent},
      {path: '', component: CatalogPageComponent},
      {path: '**', redirectTo: '/'},
    ],
  },
  {
    path: 'cart',
    component: CartPageComponent,
  },
  {path: 'contact', component: ContactPageComponent},
  {path: 'about', component: AboutPageComponent},
  {path: '', component: IndexPageComponent},
  {path: '**', redirectTo: '/'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
