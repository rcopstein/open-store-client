import {AbstractControl} from '@angular/forms';

const provinces = [
  'AB',
  'BC',
  'MB',
  'NB',
  'NL',
  'NS',
  'NT',
  'NU',
  'ON',
  'PE',
  'QC',
  'SK',
  'YT',
];

export const ValidProvince = (
  control: AbstractControl
): {[key: string]: any} | null => {
  const valid = provinces.find(x => x === control.value);
  return valid
    ? null
    : {
        province: {value: control.value},
      };
};
