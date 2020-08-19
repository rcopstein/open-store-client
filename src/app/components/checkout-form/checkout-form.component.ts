import {CheckoutOrder} from 'src/app/model/Checkout/CheckoutOrder';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ValidPostalCodeCanada} from 'src/app/validators/postal-code';
import {ValidProvince} from 'src/app/validators/province';
import {Component, OnInit, Input} from '@angular/core';
import {Address} from 'src/app/model/Address/Address';

@Component({
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.sass'],
  selector: 'app-checkout-form',
})
export class CheckoutFormComponent implements OnInit {
  @Input() forceShowValidation: boolean = false;

  formGroup = new FormGroup({
    // Customer
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required]),

    // Shipping Address
    shipping_address: new FormGroup({
      postalCode: new FormControl('', [
        Validators.required,
        ValidPostalCodeCanada,
      ]),
      state: new FormControl('AB', [Validators.required, ValidProvince]),
      street: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      country: new FormControl(''),
    }),

    // Billing Address
    billing_address: new FormGroup({
      postalCode: new FormControl('', [
        Validators.required,
        ValidPostalCodeCanada,
      ]),
      state: new FormControl('AB', [Validators.required, ValidProvince]),
      street: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      country: new FormControl(''),
    }),

    // Use same address
    use_same_shipping_billing: new FormControl(true),
  });

  get ShippingAddress() {
    return this.formGroup.controls.shipping_address as FormGroup;
  }

  get BillingAddress() {
    return this.formGroup.controls.billing_address as FormGroup;
  }

  get Valid() {
    return this.formGroup.valid;
  }

  toggleBillingAddress(toggle: boolean) {
    if (toggle) {
      this.formGroup.controls.billing_address.disable();
    } else {
      this.formGroup.controls.billing_address.enable();
    }
  }

  onSubmit(): CheckoutOrder | undefined {
    if (!this.Valid) {
      this.forceShowValidation = true;
      return undefined;
    }

    // Build CheckoutOrder
    const name = this.formGroup.controls.name.value;
    const email = this.formGroup.controls.email.value;

    const shipping_postal_code = this.ShippingAddress.controls.postalCode.value;
    const shipping_country = this.ShippingAddress.controls.country.value;
    const shipping_street = this.ShippingAddress.controls.street.value;
    const shipping_state = this.ShippingAddress.controls.state.value;
    const shipping_city = this.ShippingAddress.controls.city.value;

    const shipping_address = new Address();
    shipping_address.postal_code = shipping_postal_code;
    shipping_address.country = shipping_country;
    shipping_address.street = shipping_street;
    shipping_address.state = shipping_state;
    shipping_address.city = shipping_city;

    let bAddress = this.BillingAddress;
    if (this.formGroup.controls.use_same_shipping_billing.value === true) {
      bAddress = this.ShippingAddress;
    }

    const billing_postal_code = bAddress.controls.postalCode.value;
    const billing_country = bAddress.controls.country.value;
    const billing_street = bAddress.controls.street.value;
    const billing_state = bAddress.controls.state.value;
    const billing_city = bAddress.controls.city.value;

    const billing_address = new Address();
    billing_address.postal_code = billing_postal_code;
    billing_address.country = billing_country;
    billing_address.street = billing_street;
    billing_address.state = billing_state;
    billing_address.city = billing_city;

    const checkoutOrder = new CheckoutOrder(
      name,
      email,
      billing_address,
      shipping_address
    );

    return checkoutOrder;
  }

  ngOnInit() {
    // Listen for checkbox changes
    this.formGroup.controls.use_same_shipping_billing.valueChanges.subscribe(
      (value: boolean) => this.toggleBillingAddress(value)
    );
    this.toggleBillingAddress(true);
  }
}
