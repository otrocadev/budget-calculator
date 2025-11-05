import type { SecondaryService } from '../config/servicesConfig';

export type Service = {
  title: string;
  price: number;
  selected: boolean;
  secondaryServices?: SecondaryService[];
};

export type SecondaryServiceState = {
  parentService: string;
  title: string;
  amount: number;
  type: 'addOn' | 'feature';
  price?: number;
};
