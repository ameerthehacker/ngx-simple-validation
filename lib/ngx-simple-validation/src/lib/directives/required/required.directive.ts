import { Directive, forwardRef, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

import { NG_VALIDATORS, Validator, ValidationErrors, Validators, AbstractControl } from '@angular/forms';
import { ValidationErrorService } from '../../services/validation-error/validation-error.service';

const REQUIRED_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => RequiredDirective),
  multi: true
}

@Directive({
  selector: '[formControlName][svRequired]',
  providers: [REQUIRED_VALIDATOR, ValidationErrorService]
})
export class RequiredDirective implements Validator, OnChanges {
  @Input('svRequired')
  errorMessage: string;
  defaultErrorMessage: string = 'This field is required';
  onChange: () => {};

  constructor(private elementRef: ElementRef, private validationErrorService: ValidationErrorService) { }

  public validate(formControl: AbstractControl): ValidationErrors | null {
    return this.validationErrorService.validate(this.elementRef.nativeElement, formControl, Validators.required, this.errorMessage || this.defaultErrorMessage);
  }

  ngOnChanges(changes: SimpleChanges) {
    for(let key in changes) {
      if(key === 'errorMessage') {
        this.onChange && this.onChange();
      }
    }
  }

  public registerOnValidatorChange(fn) {
    this.onChange = fn;
  }
}
