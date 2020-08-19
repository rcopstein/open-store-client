import {UnitCaseListing} from 'src/app/model/Unit/UnitCaseListing';
import {UnitSelectorComponent} from '../unit-selector.component';
import {Component} from '@angular/core';

@Component({
  templateUrl: './case-unit-selector.component.html',
  styleUrls: ['./case-unit-selector.component.sass'],
  selector: 'app-case-unit-selector',
})
export class CaseUnitSelectorComponent extends UnitSelectorComponent {
  selected: UnitCaseListing;
  units: UnitCaseListing[];

  // Properties
  set Selected(value: UnitCaseListing) {
    this.selected = value;
    this.onSelected.emit(this.selected);
  }
  get Selected() {
    return this.selected;
  }

  get ShowAlert() {
    return this.selected !== undefined && this.selected.quantity !== undefined;
  }
  get AlertText() {
    let unitText = this.selected.quantity === 1 ? 'unit' : 'units';
    return `Only ${this.selected.quantity} ${unitText} left!`;
  }

  // Methods
  setUnits(value: UnitCaseListing[]) {
    value = value.sort((x, y) =>
      x.device > y.device ? 1 : x.device === y.device ? 0 : -1
    );
    this.checkUnits();

    if (value.length > 0) {
      const first = value.find(x => x.available);
      if (first !== undefined) this.Selected = first;
    }
    this.units = value;
  }

  checkUnits() {
    this.units.forEach(x => {
      if (!(x instanceof UnitCaseListing)) {
        console.error('Invalid unit listing on CaseUnitSelector!');
        console.error(x);
      }
    });
  }

  constructor() {
    super();

    if (this.units !== undefined) this.checkUnits();
    else this.units = new Array<UnitCaseListing>();
  }
}
