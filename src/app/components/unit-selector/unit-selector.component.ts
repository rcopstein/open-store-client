import {Output, EventEmitter, Input} from '@angular/core';
import {UnitListing} from 'src/app/model/Unit/UnitListing';

export abstract class UnitSelectorComponent {
  @Output('onSelected') onSelected: EventEmitter<UnitListing>;

  setUnits(units: UnitListing[]) {}

  constructor() {
    this.onSelected = new EventEmitter<UnitListing>();
  }
}
