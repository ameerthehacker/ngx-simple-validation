import { ValidatorFn } from "@angular/forms";

export interface IValidatorOption {
  selector: string;
  validatorFn: ValidatorFn;
  defaultErrorMessage: string;
}

