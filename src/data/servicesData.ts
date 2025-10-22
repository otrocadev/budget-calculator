export type Service = {
  title: string;
  description: string;
  price: number;
  selected: boolean;
  secondaryServices?: SecondaryService[];
};

export type SecondaryService = {
  title: string;
  type: 'feature' | 'addOn'; // addOns are applied to each feature
  description: string;
  price?: number;
  amount: number;
};

export const servicesData: Service[] = [
  {
    title: 'SEO',
    description: "Programació d'una web responsive complerta",
    price: 300,
    selected: false,
  },
  {
    title: 'Ads',
    description: 'Campanya de Google o Facebook ads',
    price: 400,
    selected: false,
  },
  {
    title: 'Web',
    description: "Programació d'una web responsive complerta",
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
