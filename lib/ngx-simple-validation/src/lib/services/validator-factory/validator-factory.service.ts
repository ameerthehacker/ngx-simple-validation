import { Directive, OnChanges, forwardRef, Input, ElementRef, SimpleChanges } from "@angular/core";
import { Validator, NG_VALIDATORS, AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

import { ValidationErrorService } from "../validation-error/validation-error.service";

import { IValidatorOption } from "../../contract/validator-option";
import { IValidationOption } from "../../contract/validation-option";

import { formatErrorMessages } from "../../util";

export class ValidatorFactoryService {
  public static create(validatorOptions: IValidatorOption) {
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

      constructor(private elementRef: ElementRef, private validationErrorService: ValidationErrorService) { }

      public validate(formControl: AbstractControl): ValidationErrors | null {
        let errorMessage: string, args: string | string [], validatorFn: ValidatorFn = validatorOptions.validatorFn;

        if(this.option != undefined) {
          errorMessage = this.option.message;
          args = this.option.args;
        }
        if(args != null) {
          if(Array.isArray(args)) {
            validatorFn = validatorOptions.validatorFn.apply(this, args);
          }
          else {
            validatorFn = validatorOptions.validatorFn.apply(this, [args]);
          }
        }

        let argsArray: string[] = Array.isArray(args)? args: [args];
        let formattedErrorMessage = formatErrorMessages(errorMessage || validatorOptions.defaultErrorMessage, argsArray);

        return this.validationErrorService.validate(this.elementRef.nativeElement, formControl, validatorFn, formattedErrorMessage);
      }

      ngOnChanges(changes: SimpleChanges) {
        for(let key in changes) {
          if(key === 'option') {
            this.onChange && this.onChange();
          }
        }
      }

      public registerOnValidatorChange(fn) {
        this.onChange = fn;
      }
    }

    return ValidatorDirective;
  }
}