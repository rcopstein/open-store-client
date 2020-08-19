import {Component} from '@angular/core';
import {CountryService} from 'src/app/services/country/country.service';
import {CountrySelectorComponent} from '../country-selector/country-selector.component';

@Component({
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
  selector: 'app-header',
})
export class HeaderComponent {
  get CountrySymbol() {
    return this.countryService.getCountry()?.symbol;
  }

  showCountrySelector() {
    CountrySelectorComponent.invoke = true;
  }

  constructor(private countryService: CountryService) {}
}
