import {ProductListing} from '../Product/ProductListing';

export abstract class UnitListing {
  product: ProductListing;
  available: boolean;
  quantity: number;
  price: any;
  id: string;
}
