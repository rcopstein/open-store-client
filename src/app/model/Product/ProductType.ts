export enum ProductType {
  'SHOE',
  'CASE',
}

export function ToProductType(value: string): ProductType {
  if (value === 'SHOE') return ProductType.SHOE;
  if (value === 'CASE') return ProductType.CASE;
  return undefined;
}
