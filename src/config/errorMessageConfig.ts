import type { ErrorType } from '../types/validationTypes';
import type { FormInputType } from '../types/validationTypes';

export const ERROR_MESSAGES: Record<
  FormInputType | 'services',
  Partial<Record<ErrorType, string>>
> = {
  name: {
    empty: 'Name is required',
    notString: 'Name must be a string',
    notEnoughChars: 'Name must be at least 2 characters long',
    notLettersOnly: 'Name must contain only letters',
  },
  email: {
    empty: 'Email is required',
    notString: 'Email must be a string',
    notArroba: 'Email must contain @',
    notDot: 'Email must contain .',
  },
  phone: {
    empty: 'Phone is required',
    notString: 'Phone must be a string',
    notNumbersOnly: 'Phone must contain only numbers',
    notEnoughChars: 'Phone must be at least 2 characters long',
    moreThanAcceptedChars: 'Phone must be at most 9 characters long',
  },
  services: {
    empty: 'Services is required',
  },
};
