// Error types
type ErrorType =
  | 'empty'
  | 'notString'
  | 'notEnoughChars'
  | 'notLettersOnly'
  | 'notNumbersOnly'
  | 'notAlphanumeric'
  | 'notArroba';

// Basic checks
const notEmpty = (value: string) => {
  return value.trim() !== '';
};

const isLessThanChars = (value: string, lenght = 10) => {
  return value.length <= lenght;
};

const isMoreThanChars = (value: string, lenght = 2) => {
  return value.length >= lenght;
};

const isOnlyLettersAndSpaces = (value: string) => {
  return /^[a-zA-Z ]+$/.test(value);
};

const isOnlyNumbers = (value: number | string) => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'number') return true;
  return /^[0-9]+$/.test(value);
};

const isAlphanumeric = (value: string) => {
  const hasNumbers = /[0-9]/.test(value);
  const hasLetters = /[a-zA-Z]/.test(value);
  return hasNumbers && hasLetters;
};

// Form input checks
export const isNameValid = (name: string) => {
  if (typeof name !== 'string') {
    return 'notString';
  }
  if (!notEmpty(name)) {
    return 'empty';
  }
  if (!isOnlyLettersAndSpaces(name)) {
    return 'notLettersOnly';
  }
  if (!isMoreThanChars(name)) {
    return 'notEnoughChars';
  }
  return 'valid';
};

export const isEmailValid = (email: string) => {
  if (typeof email !== 'string') {
    return 'notString';
  }
  if (!notEmpty(email)) {
    return 'empty';
  }
  if (typeof email !== 'string') {
    return 'notString';
  }
  if (!email.includes('@')) {
    return 'notArroba';
  }
  if (!email.split('@')[1].includes('.')) {
    return 'notDot';
  }
  return 'valid';
};

export const isPhoneValid = (phone: string) => {
  if (typeof phone !== 'string') {
    return 'notString';
  }
  if (!notEmpty(phone)) {
    return 'empty';
  }
  if (!isOnlyNumbers(phone)) {
    return 'notNumbersOnly';
  }
  if (!isLessThanChars(phone)) {
    return 'notEnoughChars';
  }
  if (!isMoreThanChars(phone, 9)) {
    return 'notEnoughChars';
  }
  return 'valid';
};
