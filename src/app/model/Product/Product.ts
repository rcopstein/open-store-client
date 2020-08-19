import {UnitListing} from '../Unit/UnitListing';

export function isProductAvailable(product: Product) {
  return product.units.some(x => x.quantity > 0);
}

export abstract class Product {
  id: string;
  name: string;
  description: string;
  units: UnitListing[];
}
