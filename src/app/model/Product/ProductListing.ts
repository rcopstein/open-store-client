import {ProductType} from './ProductType';

export interface ProductListing {
  id: string;
  price: any;
  name: string;
  currency: string;
  description: string;

  type: ProductType;
}
