import {CountryService} from 'src/app/services/country/country.service';
import {ValidProvince} from 'src/app/validators/province';
import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {ValidState} from 'src/app/validators/state';
import {
  ValidPostalCodeCanada,
  ValidPostalCodeBrazil,
} from 'src/app/validators/postal-code';

@Component({
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.sass'],
  selector: 'app-address-form',
})
export class AddressFormComponent implements OnInit {
  @Input() forceShowValidation: boolean = false;
  @Input() parentFormGroup: FormGroup;
  private _country: string;

  // View values
  get postalCodePlaceholder() {
    if (this._country === 'BRAZIL') return 'XXXXX-XXX';
    if (this._country === 'CANADA') return 'XXX XXX';
    return undefined;
  }

  get statePrompt() {
    if (this._country === 'CANADA') return 'Province';
    if (this._country === 'BRAZIL') return 'State';
    return undefined;
  }

  get states() {
    if (this._country === 'CANADA') {
      return [
        {value: 'AB', text: 'Alberta'},
        {value: 'BC', text: 'British Columbia'},
        {value: 'MB', text: 'Manitoba'},
        {value: 'NB', text: 'New Brunswick'},
        {value: 'NL', text: 'Newfoundland and Labrador'},
        {value: 'NS', text: 'Nova Scotia'},
        {value: 'NT', text: 'Northwest Territories'},
        {value: 'NU', text: 'Nunavut'},
        {value: 'ON', text: 'Ontario'},
        {value: 'PE', text: 'Prince Edward Island'},
        {value: 'QC', text: 'Quebec'},
        {value: 'SK', text: 'Saskatchewan'},
        {value: 'YT', text: 'Yukon'},
      ];
    }

    if (this._country === 'BRAZIL') {
      return [
        {value: 'AC', text: 'Acre'},
        {value: 'AL', text: 'Alagoas'},
        {value: 'AP', text: 'Amapá'},
        {value: 'AM', text: 'Amazonas'},
        {value: 'BA', text: 'Bahia'},
        {value: 'CE', text: 'Ceará'},
        {value: 'DF', text: 'Distrito Federal'},
        {value: 'ES', text: 'Espírito Santo'},
        {value: 'GO', text: 'Goiás'},
        {value: 'MA', text: 'Maranhão'},
        {value: 'MT', text: 'Mato Grosso'},
        {value: 'MS', text: 'Mato Grosso do Sul'},
        {value: 'MG', text: 'Minas Gerais'},
        {value: 'PA', text: 'Pará'},
        {value: 'PB', text: 'Paraíba'},
        {value: 'PR', text: 'Paraná'},
        {value: 'PE', text: 'Pernambuco'},
        {value: 'PI', text: 'Piauí'},
        {value: 'RJ', text: 'Rio de Janeiro'},
        {value: 'RN', text: 'Rio Grande do Norte'},
        {value: 'RS', text: 'Rio Grande do Sul'},
        {value: 'RO', text: 'Rondônia'},
        {value: 'RR', text: 'Roraima'},
        {value: 'SC', text: 'Santa Catarina'},
        {value: 'SP', text: 'São Paulo'},
        {value: 'SE', text: 'Sergipe'},
        {value: 'TO', text: 'Tocantins'},
      ];
    }
  }

  // Methods
  private initPostalCodeValidator() {
    this.postalCode.clearValidators();

    if (this._country === 'CANADA') {
      this.postalCode.setValidators([
        Validators.required,
        ValidPostalCodeCanada,
      ]);
    }

    if (this._country === 'BRAZIL') {
      this.postalCode.setValidators([
        Validators.required,
        ValidPostalCodeBrazil,
      ]);
    }

    this.postalCode.updateValueAndValidity();
  }

  private initStateValidator() {
    this.state.clearValidators();

    if (this._country === 'CANADA') {
      this.state.setValidators([Validators.required, ValidProvince]);
    }

    if (this._country === 'BRAZIL') {
      this.state.setValidators([Validators.required, ValidState]);
    }

    this.state.updateValueAndValidity();
  }

  // Fields
  get postalCode() {
    return this.parentFormGroup?.get('postalCode');
  }

  get country() {
    return this.parentFormGroup?.get('country');
  }

  get street() {
    return this.parentFormGroup?.get('street');
  }

  get state() {
    return this.parentFormGroup?.get('state');
  }

  get city() {
    return this.parentFormGroup?.get('city');
  }

  // Lifecycle
  ngOnInit() {
    this.initPostalCodeValidator();
    this.initStateValidator();

    this.country.setValue(this._country);
  }

  constructor(private countryService: CountryService) {
    this._country = countryService.getCountry().name;
    this._country = this._country.toUpperCase();
  }
}
