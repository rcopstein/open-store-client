import {UnitShoeListing} from 'src/app/model/Unit/UnitShoeListing';
import {UnitSelectorComponent} from '../unit-selector.component';
import {Component} from '@angular/core';

@Component({
  templateUrl: './shoe-unit-selector.component.html',
  styleUrls: ['./shoe-unit-selector.component.sass'],
  selector: 'app-shoe-unit-selector',
})
export class ShoeUnitSelectorComponent extends UnitSelectorComponent {
  selected: UnitShoeListing;
  units: UnitShoeListing[];

  // Properties
  set Selected(value: UnitShoeListing) {
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
  setUnits(value: UnitShoeListing[]) {
    value = value.sort((x, y) => x.size - y.size);
    this.checkUnits();

    if (value.length > 0) {
      const first = value.find(x => x.available);
      if (first !== undefined) this.Selected = first;
    }
    this.units = value;
  }

  checkUnits() {
    this.units.forEach(x => {
      if (!(x instanceof UnitShoeListing)) {
        console.error('Invalid unit listing on ShoeUnitSelector!');
        console.error(x);
      }
    });
  }

  // Constructor
  constructor() {
    super();

    if (this.units !== undefined) this.checkUnits();
    else this.units = new Array<UnitShoeListing>();
  }
}
