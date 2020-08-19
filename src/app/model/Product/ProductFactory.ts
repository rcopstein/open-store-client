import {ToProductType, ProductType} from './ProductType';
import {UnitFactory} from '../Unit/UnitFactory';
import {ProductShoe} from './ProductShoe';
import {ProductCase} from './ProductCase';
import {Product} from './Product';

export class ProductFactory {
  private static makeShoes(obj: any): ProductShoe {
    const result = new ProductShoe();
    result.units = obj.units.map(UnitFactory.fromAny);
    result.description = obj.product.description;
    result.artist = obj.product.artist;
    result.name = obj.product.name;
    result.id = obj.product.id;
    return result;
  }

  private static makeCases(obj: any): ProductCase {
    const result = new ProductCase();
    result.units = obj.units.map(UnitFactory.fromAny);
    result.description = obj.product.description;
    result.artist = obj.product.artist;
    result.name = obj.product.name;
    result.id = obj.product.id;
    return result;
  }

  public static fromAny(obj: any): Product {
    const type = ToProductType(obj.product.type);
    if (type === undefined) return undefined;

    switch (type) {
      case ProductType.SHOE:
        return ProductFactory.makeShoes(obj);
      case ProductType.CASE:
        return ProductFactory.makeCases(obj);
    }
  }

  private constructor() {}
}
