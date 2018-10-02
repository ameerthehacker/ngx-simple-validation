import { NgModule } from '@angular/core';
import { BasicErrorStyle } from './implementation/basic-error-style';
import { RequiredValidator } from './validators/validators';

@NgModule({
  providers: [BasicErrorStyle],
  declarations: [RequiredValidator],
  exports: [RequiredValidator]
})
export class NgxSimpleValidationModule { }
