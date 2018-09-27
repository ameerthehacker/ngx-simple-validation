import { NgModule } from '@angular/core';
import { RequiredDirective } from './directives/required/required.directive';
import { BasicErrorStyle } from './implementation/basic_error_style';
import { MinDirective } from './directives/min/min.directive';
import { MaxDirective } from './directives/max/max.directive';

@NgModule({
  imports: [
  ],
  providers: [BasicErrorStyle],
  declarations: [RequiredDirective, MinDirective, MaxDirective],
  exports: [RequiredDirective, MinDirective, MaxDirective]
})
export class NgxSimpleValidationModule { }
