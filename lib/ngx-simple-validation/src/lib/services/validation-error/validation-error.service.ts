import { Inject } from '@angular/core';
import { VALIDATION_ERROR_STYLE } from '../../contract/error-style_injector';
import { IErrorStyle } from '../../contract/error-style';
import { ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

export class ValidationErrorService {
  errorStyleService: IErrorStyle;

  constructor(@Inject(VALIDATION_ERROR_STYLE) errorStyleService) { 
    this.errorStyleService = errorStyleService;
  }

  public validate(element: HTMLElement, formControl: AbstractControl, validator: ValidatorFn, message: string): ValidationErrors | null {
    const validationResult = validator.apply(this, [formControl]);

    if(validationResult) {
      this.errorStyleService.showError(element, message);
    }
    else {
      this.errorStyleService.removeError(element);
    }

    return validationResult;
  }
}
