export class TaxDetails {
  get Total() {
    return this.total;
  }

  get FederalRate() {
    return this.federalRate;
  }

  get FederalTax() {
    return this.federalTax;
  }

  get IsHarmonized() {
    return this.isHarmonized;
  }

  get ProvincialRate() {
    return this.provincialRate;
  }

  get ProvincialTax() {
    return this.provincialTax;
  }

  get ProvincialRateName() {
    return this.provincialRateName;
  }

  constructor(
    private total: number,
    private federalRate: number,
    private federalTax: number,
    private isHarmonized: boolean,
    private provincialRate: number,
    private provincialTax: number,
    private provincialRateName: string
  ) {}
}
