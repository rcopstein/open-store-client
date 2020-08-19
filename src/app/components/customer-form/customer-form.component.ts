import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.sass'],
  selector: 'app-customer-form',
})
export class CustomerFormComponent {
  @Input() forceShowValidation: boolean = false;
  @Input() parentFormGroup: FormGroup;

  get email() {
    return this.parentFormGroup?.get('email');
  }

  get name() {
    return this.parentFormGroup?.get('name');
  }
}
