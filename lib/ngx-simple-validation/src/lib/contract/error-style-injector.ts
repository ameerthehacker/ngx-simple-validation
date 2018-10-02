import { InjectionToken } from '@angular/core';
import { IErrorStyle } from './error-style';

export const VALIDATION_ERROR_STYLE = new InjectionToken<IErrorStyle>(
  'ErrorStyleInjector'
);
