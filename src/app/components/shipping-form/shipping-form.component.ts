import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Component, Output, EventEmitter} from '@angular/core';

@Component({
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.sass'],
  selector: 'app-shipping-form',
})
export class ShippingFormComponent {
  @Output() shippingType: EventEmitter<string>;

  _value = 'REGULAR';
  formModel = new FormGroup({
    shipping_type: new FormControl(this._value, [Validators.required]),
  });

  onSubmit(): string | undefined {
    if (!this.formModel.valid) return undefined;
    return this._value;
  }

  constructor() {
    this.shippingType = new EventEmitter<string>();

    this.formModel.controls.shipping_type.valueChanges.subscribe(x => {
      this._value = x;
      this.shippingType.emit(this._value);
    });
    this.shippingType.emit(this._value);
  }
}
