import {OrderService} from 'src/app/services/order/order.service';
import {CartService} from 'src/app/services/cart/cart.service';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Order} from 'src/app/model/Order/Order';
import {Subscription} from 'rxjs';

@Component({
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.sass'],
  selector: 'app-order-page',
})
export class OrderPageComponent implements OnInit, OnDestroy {
  private orderSubscription: Subscription;
  private routeSubscription: Subscription;

  retrieved: boolean;
  order: Order;
  id: string;

  subscribeToOrder() {
    this.orderSubscription = this.orderService.get(this.id).subscribe(
      order => {
        this.retrieved = true;
        this.order = order;
      },
      e => {
        this.retrieved = true;
        console.error(e);
      }
    );
  }

  // Lifecycle
  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.orderSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe((params: Params) => {
      this.id = params.get('id');
      this.subscribeToOrder();
      this.cart.Clear();
    });
  }

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private cart: CartService
  ) {}
}
