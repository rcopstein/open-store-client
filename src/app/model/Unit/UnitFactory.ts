import {UnitShoeListing} from './UnitShoeListing';
import {UnitCaseListing} from './UnitCaseListing';
import {UnitListing} from './UnitListing';

export class UnitFactory {
  public static fromAny(obj: any): UnitListing {
    if (obj.type === 'SHOE') {
      const result = new UnitShoeListing();
      result.available = obj.available;
      result.quantity = obj.quantity;
      result.product = obj.product;
      result.price = obj.price;
      result.size = obj.size;
      result.id = obj.id;
      return result;
    }

    if (obj.type === 'CASE') {
      const result = new UnitCaseListing();
      result.available = obj.available;
      result.quantity = obj.quantity;
      result.product = obj.product;
      result.device = obj.device;
      result.price = obj.price;
      result.id = obj.id;
      return result;
    }

    return undefined;
  }

  private constructor() {}
}
