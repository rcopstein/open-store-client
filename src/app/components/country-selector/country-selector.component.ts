import {CountryService} from 'src/app/services/country/country.service';
import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  templateUrl: './country-selector.component.html',
  styleUrls: ['./country-selector.component.sass'],
  selector: 'app-country-selector',
})
export class CountrySelectorComponent {
  public static invoke = false;

  get ShouldShow() {
    return (
      this.service.getCountry() === undefined || CountrySelectorComponent.invoke
    );
  }

  get Countries() {
    return this.service.getCountries();
  }

  get IsInvoke() {
    return CountrySelectorComponent.invoke;
  }

  select(country: string) {
    const prev = this.service.getCountry();
    this.service.setCountry(country);

    if (this.IsInvoke && this.service.getCountry().name !== prev.name) {
      window.location.reload();
    }

    this.close();
  }

  close() {
    CountrySelectorComponent.invoke = false;
  }

  constructor(private service: CountryService, private router: Router) {}
}
