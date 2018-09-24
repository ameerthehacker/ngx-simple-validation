import { FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';

export interface IValidationOption {
  formGroup: FormGroup;
  validations: Array<string | object>;
}

export interface IValidatorsMap {
  [map: string]: IValidatorMap;
}

export interface IValidatorMap {
  message: string;
  validator(any): null | ValidationErrors;
}
