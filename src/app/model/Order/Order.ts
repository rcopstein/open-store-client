import {CartListing} from '../Cart/CartListing';

export interface Order {
  id: string;
  billing: any;
  status: string;
  items: CartListing[];
}
