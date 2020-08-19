import {ProductListing} from 'src/app/model/Product/ProductListing';
import {ProductFactory} from 'src/app/model/Product/ProductFactory';
import {ToProductType} from 'src/app/model/Product/ProductType';
import {environment} from '../../../environments/environment';
import {Product} from 'src/app/model/Product/Product';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {CountryService} from '../country/country.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public products(): Observable<Array<ProductListing>> {
    let country = this.countryService.getCountry()?.name;
    country = encodeURIComponent(country);

    let url = `${environment.server_url}/catalog`;
    if (country !== undefined) url += `?country=${country}`;

    return this.http.get<Array<any>>(url).pipe(
      map(values => {
        return values.map(value => {
          const result = value as ProductListing;
          result.type = ToProductType(value.type);
          return result;
        });
      })
    );
  }

  public product(id: string): Observable<Product> {
    id = encodeURIComponent(id);

    let country = this.countryService.getCountry()?.name;
    country = encodeURIComponent(country);

    let url = `${environment.server_url}/product/${id}`;
    if (country !== undefined) url += `?country=${country}`;

    return this.http.get(url).pipe(
      map((result: any) => {
        return ProductFactory.fromAny(result);
      })
    );
  }

  constructor(
    private http: HttpClient,
    private countryService: CountryService
  ) {}
}
