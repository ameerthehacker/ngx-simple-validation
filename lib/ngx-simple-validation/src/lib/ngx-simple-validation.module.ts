import { NgModule } from '@angular/core';
import { BasicErrorStyle } from './implementation/basic-error-style';
import { 
  RequiredValidator, 
  MaxValidator, 
  MinValidator, 
  MinLengthValidator, 
  MaxLengthValidator,
  PatternValidator, 
  RequiredTrueValidator, 
  NullValidator, 
  EmailValidator } from './validators/validators';

const validators = [
  RequiredValidator, 
  MaxValidator, 
  MinValidator, 
  MaxLengthValidator, 
  MinLengthValidator, 
  PatternValidator, 
  RequiredTrueValidator, 
  NullValidator, 
  EmailValidator
];

@NgModule({
  providers: [BasicErrorStyle],
  declarations: validators,
  exports: validators
})
export class NgxSimpleValidationModule { }
