import { ValidatorFactoryService } from '../services/validator-factory/validator-factory.service';
import { Validators } from '@angular/forms';

export const RequiredValidator = ValidatorFactoryService.create({
  selector: 'svRequired',
  validatorFn: Validators.required,
  defaultErrorMessage: 'This field is requied'
});
