import {AbstractControl} from '@angular/forms';

export const ValidPostalCodeCanada = (
  control: AbstractControl
): {[key: string]: any} | null => {
  const regex = /[A-Za-z][1-9][A-Za-z]\s?[1-9][A-Za-z][1-9]/;
  const valid = regex.test(control.value);
  return valid
    ? null
    : {
        postalCode: {value: control.value},
      };
};

export const ValidPostalCodeBrazil = (
  control: AbstractControl
): {[key: string]: any} | null => {
  const regex = /^\d{5}-?\d{3}$/;
  const valid = regex.test(control.value);
  return valid
    ? null
    : {
        postalCode: {value: control.value},
      };
};
