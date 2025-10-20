type Service = {
  title: string;
  description: string;
  price: number;
  selected: boolean;
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
  },
];
