import {AbstractControl} from '@angular/forms';

const states = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
];

export const ValidState = (
  control: AbstractControl
): {[key: string]: any} | null => {
  const valid = states.find(x => x === control.value);
  return valid
    ? null
    : {
        state: {value: control.value},
      };
};
