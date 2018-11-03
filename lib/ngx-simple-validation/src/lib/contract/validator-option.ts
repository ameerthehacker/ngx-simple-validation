import { ValidatorFn, AsyncValidatorFn } from '@angular/forms';

export interface IValidatorOption {
  async?: boolean;
  selector: string;
  defaultErrorMessage: string;
  validatorFn(any): ValidatorFn | AsyncValidatorFn;
}
