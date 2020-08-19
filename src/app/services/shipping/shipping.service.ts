import {environment} from 'src/environments/environment';
import {Address} from 'src/app/model/Address/Address';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShippingService {
  private static readonly URL = `${environment.server_url}/order/shipping`;

  public price(
    type: string,
    units: string[],
    address: Address
  ): Observable<number> {
    const body = {
      shipping_type: type,
      units,
      address: {
        country: address.country || 'CANADA',
        postal_code: address.postal_code,
        street: address.street,
        state: address.state,
        city: address.city,
      },
    };

    const observable = this.http
      .post<any>(ShippingService.URL, body)
      .pipe(map(result => result.price));

    return observable;
  }

  constructor(private http: HttpClient) {}
}
