import { BudgetInfo } from '../../types/budgetTypes';

export const budgetMocks: BudgetInfo[] = [
  {
    name: 'Ana Laf',
    email: 'ana.laf@gmail.com',
    phone: '123456789',
    budgetServices: [{ title: 'SEO' }],
    total: 300,
    date: '2025-10-05T09:37:04.643Z',
  },
  {
    name: 'Arnau',
    email: 'arnau@gmail.com',
    phone: '987654321',
    budgetServices: [{ title: 'Ads' }],
    total: 400,
    date: '2024-10-05T09:37:04.643Z',
  },
  {
    name: 'Giu E.',
    email: 'giu@gmail.com',
    phone: '456789123',
    budgetServices: [
      { title: 'SEO', secondaryServices: [{ title: 'pages', amount: 4 }] },
      { title: 'Ads' },
    ],
    total: 700,
    date: '2025-09-05T09:37:04.643Z',
  },
  {
    name: 'Carlos G.',
    email: 'carlos.pirateofthe7seas@gmail.com',
    phone: '123456789',
    budgetServices: [{ title: 'SEO' }],
    total: 300,
    date: '2025-08-31T09:37:04.643Z',
  },
];
