export class CartItem {
  public static Deserialize(param: string): CartItem | undefined {
    const parts = param.split('|');
    if (parts.length !== 2) return undefined;

    const quantity = parseInt(parts[1]);
    const unit = parts[0];

    if (unit === undefined || unit.trim() === '' || isNaN(quantity)) {
      return undefined;
    }
    return new CartItem(unit, quantity);
  }

  public Serialize(): string {
    return `${this.unit}|${this.quantity}`;
  }

  constructor(public unit: string, public quantity: number) {}
}
