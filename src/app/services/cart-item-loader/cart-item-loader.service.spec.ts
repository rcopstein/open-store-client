import {TestBed} from '@angular/core/testing';

import {CartItemLoaderService} from './cart-item-loader.service';

describe('CartItemLoaderService', () => {
  let service: CartItemLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartItemLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
