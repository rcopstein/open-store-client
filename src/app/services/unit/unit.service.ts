import {UnitListing} from 'src/app/model/Unit/UnitListing';
import {UnitFactory} from 'src/app/model/Unit/UnitFactory';
import {CountryService} from '../country/country.service';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  private static readonly URL = `${environment.server_url}/unit`;

  public unit(id: string): Observable<UnitListing> {
    id = encodeURIComponent(id);
    let country = this.countryService.getCountry()?.name;

    let url = UnitService.URL + `/${id}`;
    if (country !== undefined) url += `?country=${country}`;

    return this.http
      .get<UnitListing>(url)
      .pipe(map(x => UnitFactory.fromAny(x)));
  }

  constructor(
    private http: HttpClient,
    private countryService: CountryService
  ) {}
}
