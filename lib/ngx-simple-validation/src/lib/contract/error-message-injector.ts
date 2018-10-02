import { InjectionToken } from '@angular/core';
import { IErrorMessage } from './error-message';

export const VALIDATION_ERROR_MESSAGES = new InjectionToken<IErrorMessage>(
  'ErrorMessageInjector'
);
