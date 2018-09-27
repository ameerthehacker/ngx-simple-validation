import { Directive, forwardRef, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

import { NG_VALIDATORS, Validator, ValidationErrors, Validators, AbstractControl } from '@angular/forms';
import { ValidationErrorService } from '../../services/validation-error/validation-error.service';
import { formatErrorMessages } from '../../util';

const MIN_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MinDirective),
  multi: true
}

@Directive({
  selector: '[formControlName][svMin]',
  providers: [MIN_VALIDATOR, ValidationErrorService]
})
export class MinDirective implements Validator, OnChanges {
  @Input('svMin')
  option: any;
  errorMessage: string;
  min: number;
  defaultErrorMessage: string = 'This should be greater than or equal to {0}';
  onChange: () => {};

  constructor(private elementRef: ElementRef, private validationErrorService: ValidationErrorService) { }

  public validate(formControl: AbstractControl): ValidationErrors | null {
    if(this.option == undefined) {
      throw new Error('provide minimum value for the validator')
    }
    if(typeof(this.option) == 'object') {
      this.min = parseInt(this.option.value);
      this.errorMessage = this.option.message;
    }
    else {
      this.min = parseInt(this.option);      
    }

    const errorMessage = formatErrorMessages((this.errorMessage || this.defaultErrorMessage), [this.min.toString()]);

    return this.validationErrorService.validate(this.elementRef.nativeElement, formControl, Validators.min(this.min), errorMessage);
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
