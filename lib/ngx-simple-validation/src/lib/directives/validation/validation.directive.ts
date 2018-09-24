import { Directive, ElementRef, Input, AfterContentInit } from '@angular/core';
import { Validators, AbstractControl, ValidationErrors } from '@angular/forms';

import {
  IValidationOption,
  IValidatorsMap
} from '../../models/validation-option';

import { ConfigurationService } from '../../services/configuration/configuration.service';

@Directive({
  selector: '[Validation]'
})
export class ValidationDirective implements AfterContentInit {
  @Input()
  Validation: IValidationOption;
  validatorsMap: IValidatorsMap = {
    required: {
      validator: Validators.required,
      message: 'This field is required'
    },
    min: {
      validator: Validators.min,
      message: 'Value should be less than or equal to {0}'
    },
    max: {
      validator: Validators.max,
      message: 'Value should be greated than or equal to {0}'
    },
    minLength: {
      validator: Validators.minLength,
      message: 'This field should be less than or equal to {0} in size'
    },
    pattern: {
      validator: Validators.pattern,
      message: 'This format is invalid'
    },
    maxLength: {
      validator: Validators.maxLength,
      message: 'This field should be greater then or equal to {0} in size'
    },
    null: {
      validator: Validators.nullValidator,
      message: 'This field cannot be null'
    }
  };

  constructor(
    private elementRef: ElementRef,
    private configurationService: ConfigurationService
  ) {}

  ngAfterContentInit() {
    const formControlName = (<HTMLElement>(
      this.elementRef.nativeElement
    )).getAttribute('formControlName');
    const validators = [];

    this.Validation.validations.forEach(validation => {
      if (typeof validation === 'string') {
        validators.push(
          this.constructValidationFn(this.validatorsMap[validation], null).bind(
            this
          )
        );
      } else {
        const validationName = Object.keys(validation)[0];
        let option = validation[validationName];
        let message: string = null;

        if (!Array.isArray(option) && typeof option === 'object') {
          message = option['message'];
          option = option['args'];
        } else if (!Array.isArray(option)) {
          option = [option];
        }
        validators.push(
          this.constructValidationFn(
            this.validatorsMap[validationName],
            option,
            message
          ).bind(this)
        );
      }
    });

    this.Validation.formGroup.get(formControlName).setValidators(validators);
    this.Validation.formGroup.updateValueAndValidity();
  }

  public constructValidationFn(
    validatorMap: any,
    options: any[],
    message: string = null
  ) {
    return function(formControl: AbstractControl): ValidationErrors | null {
      const validationResult =
        options != null
          ? validatorMap.validator
              .apply(this, options)
              .apply(this, [formControl])
          : validatorMap.validator.apply(this, [formControl]);

      if (validationResult != null) {
        if (formControl.valid) {
          this.configurationService.Configuration.showError(
            this.elementRef.nativeElement,
            this.formatMessage(message || validatorMap.message, options)
          );
        }
      } else {
        this.configurationService.Configuration.removeError(
          this.elementRef.nativeElement
        );
      }

      return validationResult;
    };
  }

  private formatMessage(message: string, options: any[]): string {
    if (options != null) {
      options.forEach((option, index) => {
        message = message.replace(`{${index}}`, option);
      });
    }

    return message;
  }
}
