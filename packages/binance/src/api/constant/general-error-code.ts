export const GENERAL_ERROR_CODES = {
  UNKNOWN: -1000,
  DISCONNECTED: -1001
} as const;

export const GENERAL_ERROR_MESSAGES = {
  [GENERAL_ERROR_CODES.UNKNOWN]: 'An unknown error occured while processing the request.',
  [GENERAL_ERROR_CODES.DISCONNECTED]: 'Internal error; unable to process your request. Please try again.'
} as const;

export type GeneralErrorCode = typeof GENERAL_ERROR_CODES[keyof typeof GENERAL_ERROR_CODES];
