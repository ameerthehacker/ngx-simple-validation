import { ValidatorFactoryService } from '../services/validator-factory/validator-factory.service';
import { Validators } from '@angular/forms';

export const RequiredValidator = ValidatorFactoryService.create({
  selector: 'svRequired',
  validatorFn: () => Validators.required,
  defaultErrorMessage: 'This field is requied'
});

export const RequiredTrueValidator = ValidatorFactoryService.create({
  selector: 'svRequiredTrue',
  validatorFn: () => Validators.requiredTrue,
  defaultErrorMessage: 'This field needs to be true'
});

export const NullValidator = ValidatorFactoryService.create({
  selector: 'svNull',
  validatorFn: () => Validators.nullValidator,
  defaultErrorMessage: 'This field cannot be null'
});

export const EmailValidator = ValidatorFactoryService.create({
  selector: 'svEmail',
  validatorFn: () => Validators.email,
  defaultErrorMessage: 'Invalid email address'
});

export const PatternValidator = ValidatorFactoryService.create({
  selector: 'svPatten',
  validatorFn: Validators.pattern,
  defaultErrorMessage: 'This format is invalid'
});

export const MaxValidator = ValidatorFactoryService.create({
  selector: 'svMax',
  validatorFn: Validators.max,
  defaultErrorMessage: 'This should be less than or equal to {0}'
});

export const MinValidator = ValidatorFactoryService.create({
  selector: 'svMin',
  validatorFn: Validators.min,
  defaultErrorMessage: 'This should be greater than or equal to {0}'
});

export const MaxLengthValidator = ValidatorFactoryService.create({
  selector: 'svMaxLength',
  validatorFn: Validators.maxLength,
  defaultErrorMessage: 'This should be atmost {0} characters'
});

export const MinLengthValidator = ValidatorFactoryService.create({
  selector: 'svMinLength',
  validatorFn: Validators.maxLength,
  defaultErrorMessage: 'This should be atleast {0} characters'
});