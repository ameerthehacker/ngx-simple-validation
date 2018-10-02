import { ValidatorFn, AsyncValidatorFn } from "@angular/forms";

export interface IValidatorOption {
  async?: boolean;
  selector: string;
  validatorFn(any): ValidatorFn | AsyncValidatorFn;
  defaultErrorMessage: string;
}

