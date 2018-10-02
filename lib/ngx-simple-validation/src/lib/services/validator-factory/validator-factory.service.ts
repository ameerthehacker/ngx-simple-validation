import {
  Directive,
  OnChanges,
  forwardRef,
  Input,
  ElementRef,
  SimpleChanges,
  Inject,
  Optional
} from '@angular/core';
import {
  Validator,
  NG_VALIDATORS,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  NG_ASYNC_VALIDATORS,
  AsyncValidator
} from '@angular/forms';

import { ValidationErrorService } from '../validation-error/validation-error.service';
import { VALIDATION_ERROR_MESSAGES } from '../../contract/error-message-injector';

import { IValidatorOption } from '../../contract/validator-option';
import { IValidationOption } from '../../contract/validation-option';
import { IErrorMessage } from '../../contract/error-message';

import { formatErrorMessage } from '../../util';
import { Observable } from 'rxjs';

function validate(
  formControl: AbstractControl,
  elementRef: ElementRef,
  option: IValidationOption,
  validatorOptions: IValidatorOption,
  validationErrorService: ValidationErrorService,
  async: boolean = false
) {
  let errorMessage: string,
    args: string | string[],
    validatorFn: ValidatorFn = validatorOptions.validatorFn;

  if (option != undefined) {
    if (typeof option === 'object') {
      errorMessage = this.option.message;
      args = this.option.args;
    } else {
      args = option;
    }
  }
  if (args != null) {
    if (Array.isArray(args)) {
      validatorFn = validatorOptions.validatorFn.apply(this, args);
    } else {
      validatorFn = validatorOptions.validatorFn.apply(this, [args]);
    }
  } else {
    validatorFn = validatorOptions.validatorFn.apply(this);
  }

  let argsArray: string[] = Array.isArray(args) ? args : [args];
  let formattedErrorMessage = formatErrorMessage(
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

export class ValidatorFactoryService {
  public static create(validatorOptions: IValidatorOption) {
    const ASYNC_VALIDATOR = {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => AsyncValidatorDirective),
      multi: true
    };

    @Directive({
      selector: `[${validatorOptions.selector}]`,
      providers: [ASYNC_VALIDATOR, ValidationErrorService]
    })
    class AsyncValidatorDirective implements AsyncValidator, OnChanges {
      @Input(validatorOptions.selector)
      option: IValidationOption;
      onChange: () => {};
      errorMessages: IErrorMessage;

      constructor(
        @Inject(VALIDATION_ERROR_MESSAGES)
        @Optional()
        errorMessages,
        private elementRef: ElementRef,
        private validationErrorService: ValidationErrorService
      ) {
        this.errorMessages = errorMessages;
      }

      public validate(
        formControl: AbstractControl
      ): Promise<ValidationErrors> | Observable<ValidationErrors> {
        if (this.errorMessages) {
          validatorOptions.defaultErrorMessage =
            this.errorMessages.messages[validatorOptions.selector] ||
            validatorOptions.defaultErrorMessage;
        }

        return validate(
          formControl,
          this.elementRef,
          this.option,
          validatorOptions,
          this.validationErrorService,
          true
        );
      }

      ngOnChanges(changes: SimpleChanges) {
        for (let key in changes) {
          if (key === 'option') {
            this.onChange && this.onChange();
          }
        }
      }

      public registerOnValidatorChange(fn) {
        this.onChange = fn;
      }
    }

    const VALIDATOR = {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ValidatorDirective),
      multi: true
    };

    @Directive({
      selector: `[${validatorOptions.selector}]`,
      providers: [VALIDATOR, ValidationErrorService]
    })
    class ValidatorDirective implements Validator, OnChanges {
      @Input(validatorOptions.selector)
      option: IValidationOption;
      onChange: () => {};
      errorMessages: IErrorMessage;

      constructor(
        @Inject(VALIDATION_ERROR_MESSAGES)
        @Optional()
        errorMessages,
        private elementRef: ElementRef,
        private validationErrorService: ValidationErrorService
      ) {
        this.errorMessages = errorMessages;
      }

      public validate(formControl: AbstractControl): ValidationErrors | null {
        if (this.errorMessages) {
          validatorOptions.defaultErrorMessage =
            this.errorMessages.messages[validatorOptions.selector] ||
            validatorOptions.defaultErrorMessage;
        }

        return validate(
          formControl,
          this.elementRef,
          this.option,
          validatorOptions,
          this.validationErrorService,
          false
        );
      }

      ngOnChanges(changes: SimpleChanges) {
        for (let key in changes) {
          if (key === 'option') {
            this.onChange && this.onChange();
          }
        }
      }

      public registerOnValidatorChange(fn) {
        this.onChange = fn;
      }
    }

    if (validatorOptions.async) {
      return AsyncValidatorDirective;
    } else {
      return ValidatorDirective;
    }
  }
}
