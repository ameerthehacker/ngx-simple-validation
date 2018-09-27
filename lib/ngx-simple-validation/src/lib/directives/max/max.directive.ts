import { Directive, forwardRef, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

import { NG_VALIDATORS, Validator, ValidationErrors, Validators, AbstractControl } from '@angular/forms';
import { ValidationErrorService } from '../../services/validation-error/validation-error.service';
import { formatErrorMessages } from '../../util';

const MAX_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MaxDirective),
  multi: true
}

@Directive({
  selector: '[formControlName][svMin]',
  providers: [MAX_VALIDATOR, ValidationErrorService]
})
export class MaxDirective implements Validator, OnChanges {
  @Input('svMax')
  option: string | any;
  errorMessage: string;
  max: number;
  defaultErrorMessage: string = 'This should be less than or equal to {0}';
  onChange: () => {};

  constructor(private elementRef: ElementRef, private validationErrorService: ValidationErrorService) { }

  public validate(formControl: AbstractControl): ValidationErrors | null {
    if(this.option == undefined) {
      throw new Error('provide maximum value for the validator')
    }
    if(typeof(this.option) == 'object') {
      this.max = parseInt(this.option.value);
      this.errorMessage = this.option.message;
    }
    else {
      this.max = parseInt(this.option);      
    }

    const errorMessage = formatErrorMessages((this.errorMessage || this.defaultErrorMessage), [this.max.toString()]);

    return this.validationErrorService.validate(this.elementRef.nativeElement, formControl, Validators.max(this.max), errorMessage);
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
