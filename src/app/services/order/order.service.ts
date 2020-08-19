import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {CheckoutOrder} from 'src/app/model/Checkout/CheckoutOrder';
import {environment} from '../../../environments/environment';
import {UnitFactory} from 'src/app/model/Unit/UnitFactory';
import {CartListing} from 'src/app/model/Cart/CartListing';
import {FailureType} from 'src/app/failure/FailureType';
import {catchError, map} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class OrderService {
  private static readonly ORDERS_URL = `${environment.server_url}/order`;

  // Error handling
  private handleInsertError(error: HttpErrorResponse) {
    // Client side error
    if (error.error instanceof ErrorEvent) {
      return throwError({
        type: FailureType.GeneralFailure,
        message:
          'There was an error connecting to the server. Please try again.',
        param: null,
      });
    }

    // Back-end error
    return throwError({
      message: 'There was an error connecting to the server. Please try again.',
      type: FailureType.GeneralFailure,
      param: error.error,
    });
  }

  private handleGetError(error: HttpErrorResponse) {
    // Client side error
    if (error.error instanceof ErrorEvent) {
      return throwError({
        type: FailureType.GeneralFailure,
        message:
          'There was an error connecting to the server. Please try again.',
        param: null,
      });
    }

    // Back-end error
    if (error.status === 404) {
      return throwError({
        message: 'Order was not found. Please check the provided link.',
        type: FailureType.GeneralFailure,
        param: error.error,
      });
    }

    return throwError({
      message:
        'There was an error while processing your request. Please try again.',
      type: FailureType.GeneralFailure,
      param: error.error,
    });
  }

  // Public methods
  public insert(order: CheckoutOrder): Observable<any> {
    const body = {
      email: order.email,
      name: order.name,

      shipping_address: {
        postal_code: order.shipping_address.postal_code,
        country: order.shipping_address.country,
        street: order.shipping_address.street,
        state: order.shipping_address.state,
        city: order.shipping_address.city,
      },

      billing_address: {
        postal_code: order.billing_address.postal_code,
        country: order.billing_address.country,
        street: order.billing_address.street,
        state: order.billing_address.state,
        city: order.billing_address.city,
      },

      items: order.items.map(x => [x.unit, x.quantity]),
      shipping_type: order.shipping_type,
    };

    return this.http
      .post(OrderService.ORDERS_URL, body)
      .pipe(catchError(this.handleInsertError));
  }

  public get(orderId: string): Observable<any> {
    return this.http
      .get(`${OrderService.ORDERS_URL}/${orderId}`)
      .pipe(catchError(this.handleGetError))
      .pipe(
        map((x: any) => {
          x.items = x.items.map(
            (item, index) =>
              new CartListing(
                UnitFactory.fromAny(item.unit),
                item.quantity,
                index
              )
          );

          return x;
        })
      );
  }

  // Constructor
  constructor(private http: HttpClient) {}
}
