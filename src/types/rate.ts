export interface IRate {
  id: string;
  expertise: string;
  rate: number;
  date?: string;
  defaultValue: boolean;
}

export enum ContractCurrencyVariant {
  rub = 'RUB',
  usd = 'USD'
}
