import { Directive, forwardRef, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

import { NG_VALIDATORS, Validator, ValidationErrors, Validators, AbstractControl } from '@angular/forms';
import { ValidationErrorService } from '../../services/validation-error/validation-error.service';
import { formatErrorMessages } from '../../util';

const MIN_LENGTH_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MaxLengthDirective),
  multi: true
}

@Directive({
  selector: '[formControlName][svMaxLength]',
  providers: [MIN_LENGTH_VALIDATOR, ValidationErrorService]
})
export class MaxLengthDirective implements Validator, OnChanges {
  @Input('svMaxLength')
  option: any;
  errorMessage: string;
  minLength: number;
  defaultErrorMessage: string = 'This should have atmost {0} characters';
  onChange: () => {};

  constructor(private elementRef: ElementRef, private validationErrorService: ValidationErrorService) { }

  public validate(formControl: AbstractControl): ValidationErrors | null {
    if(this.option == undefined) {
      throw new Error('provide maximum length value for the validator')
    }
    if(typeof(this.option) == 'object') {
      this.minLength = parseInt(this.option.value);
      this.errorMessage = this.option.message;
    }
    else {
      this.minLength = parseInt(this.option);      
    }

    const errorMessage = formatErrorMessages((this.errorMessage || this.defaultErrorMessage), [this.minLength.toString()]);

    return this.validationErrorService.validate(this.elementRef.nativeElement, formControl, Validators.maxLength(this.minLength), errorMessage);
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
