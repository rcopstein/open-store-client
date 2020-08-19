import {CookieService} from 'ngx-cookie-service';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private readonly cookieName = 'country';
  private selectedCountry: any;

  setCountry(value: string) {
    this.selectedCountry = this.getCountries().find(x => x.name === value);
    this.saveCookie();
  }

  getCountries() {
    return [
      {symbol: '🇧🇷', name: 'Brazil', code: 'BR'},
      {symbol: '🇨🇦', name: 'Canada', code: 'CA'},
    ];
  }

  getCountry() {
    return this.getCountries()[1];
    // return this.selectedCountry;
  }

  private loadCookie() {
    if (this.cookieService.check(this.cookieName)) {
      const value = this.cookieService.get(this.cookieName);
      this.selectedCountry = this.getCountries().find(x => x.name === value);
    }

    if (this.selectedCountry === undefined) {
      this.cookieService.delete(this.cookieName);
      this.selectedCountry = this.getCountries[0];
    }
  }

  private saveCookie() {
    if (
      this.selectedCountry !== undefined &&
      this.selectedCountry.name !== undefined
    ) {
      this.cookieService.set(this.cookieName, this.selectedCountry.name);
    }
  }

  constructor(private cookieService: CookieService) {
    this.loadCookie();
  }
}
