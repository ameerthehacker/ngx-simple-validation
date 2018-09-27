import { NgModule } from '@angular/core';
import { RequiredDirective } from './directives/required/required.directive';
import { BasicErrorStyle } from './implementation/basic_error_style';

@NgModule({
  imports: [
  ],
  providers: [BasicErrorStyle],
  declarations: [RequiredDirective],
  exports: [RequiredDirective]
})
export class NgxSimpleValidationModule { }
