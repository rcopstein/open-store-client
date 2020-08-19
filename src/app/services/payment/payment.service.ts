import {TaxDetails} from 'src/app/model/Payment/TaxDetails';
import {environment} from 'src/environments/environment';
import {Address} from 'src/app/model/Address/Address';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private static readonly URL = `${environment.server_url}/payments`;

  public tax(address: Address, price: number): Observable<TaxDetails> {
    return this.http
      .post<any>(PaymentService.URL + `/tax`, {state: address.state, price})
      .pipe(
        map(result => {
          return new TaxDetails(
            result.totalTax,
            result.federalRate,
            result.federalTax,
            result.isHarmonized,
            result.provincialRate,
            result.provincialTax,
            result.provincialRateName
          );
        })
      );
  }

  constructor(private http: HttpClient) {}
}
