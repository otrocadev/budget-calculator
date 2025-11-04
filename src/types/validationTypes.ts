// Error types
export type ErrorType =
  | 'valid'
  | 'empty'
  | 'notString'
  | 'notEnoughChars'
  | 'moreThanAcceptedChars'
  | 'notLettersOnly'
  | 'notNumbersOnly'
  | 'notAlphanumeric'
  | 'notArroba'
  | 'notDot';

export type FormInputType = 'name' | 'email' | 'phone';
