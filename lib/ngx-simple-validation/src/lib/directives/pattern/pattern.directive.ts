import { Directive, forwardRef, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

import { NG_VALIDATORS, Validator, ValidationErrors, Validators, AbstractControl } from '@angular/forms';
import { ValidationErrorService } from '../../services/validation-error/validation-error.service';
import { formatErrorMessages } from '../../util';

const PATTERN_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => PatternDirective),
  multi: true
}

@Directive({
  selector: '[formControlName][svPattern]',
  providers: [PATTERN_VALIDATOR, ValidationErrorService]
})
export class PatternDirective implements Validator, OnChanges {
  @Input('svPattern')
  option: any;
  errorMessage: string;
  patten: string;
  defaultErrorMessage: string = 'This does not match the format';
  onChange: () => {};

  constructor(private elementRef: ElementRef, private validationErrorService: ValidationErrorService) { }

  public validate(formControl: AbstractControl): ValidationErrors | null {
    if(this.option == undefined) {
      throw new Error('provide pattern for the validator')
    }
    if(typeof(this.option) == 'object') {
      this.patten = this.option.value;
      this.errorMessage = this.option.message;
    }
    else {
      this.patten = this.option;
    }

    const errorMessage = formatErrorMessages((this.errorMessage || this.defaultErrorMessage), [this.patten.toString()]);

    return this.validationErrorService.validate(this.elementRef.nativeElement, formControl, Validators.pattern(this.patten), errorMessage);
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
