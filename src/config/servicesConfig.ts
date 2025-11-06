import type { Service } from '../types/budgetStatusTypes';

export type SecondaryService = {
  title: string;
  type: 'feature' | 'addOn'; // addOns are applied to each feature
  description: string;
  price?: number;
  amount: number;
};

export const servicesConfig: Service[] = [
  {
    title: 'SEO',
    description: 'SEO optimization for your website',
    price: 300,
    selected: false,
  },
  {
    title: 'Ads',
    description: 'Google or Facebook ads campaign',
    price: 400,
    selected: false,
  },
  {
    title: 'Web',
    description: 'Programing a custom responsive website',
    price: 500,
    selected: false,
    secondaryServices: [
      {
        title: 'pages',
        type: 'feature',
        price: 30,
        description: 'Add the pages that your website will have',
        amount: 0,
      },
      {
        title: 'languages',
        type: 'addOn',
        description:
          'Choose the languages that your website will have. Bear in mind that each page added will be traduced to each language.',
        amount: 0,
      },
    ],
  },
];
