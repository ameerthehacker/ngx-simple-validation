import { ValidatorFn } from "@angular/forms";

export interface IValidatorOption {
  selector: string;
  validatorFn(any): ValidatorFn;
  defaultErrorMessage: string;
}

