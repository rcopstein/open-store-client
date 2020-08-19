import {CartService} from 'src/app/services/cart/cart.service';
import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  templateUrl: './cart-button.component.html',
  styleUrls: ['./cart-button.component.sass'],
  selector: 'app-cart-button',
})
export class CartButtonComponent {
  get Count() {
    return this.cartService.Length();
  }

  navigate() {
    this.router.navigate(['/cart']);
  }

  constructor(private cartService: CartService, private router: Router) {}
}
