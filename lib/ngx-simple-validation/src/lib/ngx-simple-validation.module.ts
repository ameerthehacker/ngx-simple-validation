import { NgModule } from '@angular/core';
import { ValidationDirective } from './directives/validation/validation.directive';

@NgModule({
  imports: [],
  declarations: [ValidationDirective],
  exports: [ValidationDirective]
})
export class NgxSimpleValidationModule {}
