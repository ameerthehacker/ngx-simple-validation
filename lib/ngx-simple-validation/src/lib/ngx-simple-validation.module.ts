import { NgModule } from '@angular/core';
import { RequiredDirective } from './directives/required/required.directive';
import { BasicErrorStyle } from './implementation/basic_error_style';
import { MinDirective } from './directives/min/min.directive';
import { MaxDirective } from './directives/max/max.directive';
import { PatternDirective } from './directives/pattern/pattern.directive';
import { MinLengthDirective } from './directives/min-length/min-length.directive';
import { MaxLengthDirective } from './directives/max-length/max-length.directive';

@NgModule({
  imports: [
  ],
  providers: [BasicErrorStyle],
  declarations: [RequiredDirective, MinDirective, MaxDirective, PatternDirective, MinLengthDirective, MaxLengthDirective],
  exports: [RequiredDirective, MinDirective, MaxDirective, PatternDirective, MinLengthDirective, MaxLengthDirective]
})
export class NgxSimpleValidationModule { }
