import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ElementRef } from '@angular/core';

import { ValidationErrorService } from '../services/validation-error/validation-error.service';

import { IValidationOption } from '../contract/validation-option';
import { IValidatorOption } from '../contract/validator-option';

export class Util {
  public static formatErrorMessage(message: string, args: string[]) {
    args.forEach((arg, index) => {
      message = message.replace(`{${index}}`, arg);
    });

    return message;
  }

  public static validate(
    formControl: AbstractControl,
    elementRef: ElementRef,
    option: IValidationOption,
    validatorOptions: IValidatorOption,
    validationErrorService: ValidationErrorService,
    async: boolean = false
  ) {
    let errorMessage: string,
      args: string | string[],
      argsArray: string[],
      validatorFn: ValidatorFn = validatorOptions.validatorFn;

    if (option !== undefined) {
      if (typeof option === 'object') {
        errorMessage = option.message;
        args = option.args || [];
      } else {
        args = option;
      }
    }
    if (args !== undefined) {
      if (Array.isArray(args)) {
        validatorFn = validatorOptions.validatorFn.apply(this, args);
        argsArray = args;
      } else {
        validatorFn = validatorOptions.validatorFn.apply(this, [args]);
        argsArray = [args];
      }
    } else {
      validatorFn = validatorOptions.validatorFn.apply(this);
      argsArray = [];
    }

    const formattedErrorMessage = this.formatErrorMessage(
      errorMessage || validatorOptions.defaultErrorMessage,
      argsArray
    );

    return validationErrorService.validate(
      elementRef.nativeElement,
      formControl,
      validatorFn,
      formattedErrorMessage,
      async
    );
  }
}
