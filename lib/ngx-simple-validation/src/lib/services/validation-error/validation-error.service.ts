import { Inject } from '@angular/core';
import { VALIDATION_ERROR_STYLE } from '../../contract/error-style-injector';
import { IErrorStyle } from '../../contract/error-style';
import { ValidationErrors, ValidatorFn, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { isFunction } from 'util';

export class ValidationErrorService {
  errorStyleService: IErrorStyle;
  lastErrorMessage: string;

  constructor(@Inject(VALIDATION_ERROR_STYLE) errorStyleService) { 
    this.errorStyleService = errorStyleService;
  }

  public validate(element: HTMLElement, formControl: AbstractControl, validator: ValidatorFn | AsyncValidatorFn, errorMessage: string, async: boolean = false): Promise<ValidationErrors> | Observable<ValidationErrors> {
    if(async) {
      return new Promise(resolve => {
        const fn = validator.apply(this, [formControl]);

        if(isFunction(fn.subscribe)) {
          fn.subscribe((validationResult) => {
            if(validationResult) {
              this.errorStyleService.showError(element, errorMessage);
            }
            else if(formControl.valid) {
              this.errorStyleService.removeError(element);
            }
            resolve(validationResult);
          });
        }
        else if(isFunction(fn.then)) {
          fn.then((validationResult) => {
            if(validationResult) {
              this.errorStyleService.showError(element, errorMessage);
            }
            else if(formControl.valid) {
              this.errorStyleService.removeError(element);
            }
            resolve(validationResult);
          });
        }
      });
    }
    else {
      const validationResult = validator.apply(this, [formControl]);

      if(validationResult) {
        this.lastErrorMessage = errorMessage;
      }
  
      formControl.valueChanges.subscribe(value => {
        if(formControl.invalid) {
          this.errorStyleService.showError(element, this.lastErrorMessage);
        }
        else {
          this.errorStyleService.removeError(element);
        }
      });
     
      return validationResult;
    }
    
  }
}
