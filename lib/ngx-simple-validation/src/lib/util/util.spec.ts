import { Util } from './util';
import { FormControl } from '@angular/forms';
import { ElementRef } from '@angular/core';

describe('formatErrorMessage()', () => {
  it('should replace the parameters properly', () => {
    const message = 'This is a {0} message with {1}';
    const params = ['test', 'params'];

    const formattedMessage = Util.formatErrorMessage(message, params);

    expect(formattedMessage).toBe('This is a test message with params');
  });
});

describe('validate()', () => {
  let formControl,
    elementRef,
    option,
    validatorOptions,
    validationErrorService,
    async,
    validatorFnResult;

  beforeEach(() => {
    formControl = {
      value: 'test value'
    };
    elementRef = {
      nativeElement: {
        type: 'text',
        value: 'test value'
      }
    };

    validatorFnResult = () => {};
    (validatorOptions = {
      defaultErrorMessage: 'default error message',
      validatorFn() {
        return validatorFnResult;
      }
    }),
      (validationErrorService = {
        validate() {}
      });
    async = false;
    option = undefined;
  });

  it('should call formatted message with given error message', () => {
    option = {
      message: 'error message!'
    };
    spyOn(Util, 'formatErrorMessage');

    Util.validate(
      formControl,
      elementRef,
      option,
      validatorOptions,
      validationErrorService
    );

    expect(Util.formatErrorMessage).toHaveBeenCalledWith(option.message, []);
  });

  it('should use default error message if no message is given', () => {
    spyOn(Util, 'formatErrorMessage');

    Util.validate(
      formControl,
      elementRef,
      option,
      validatorOptions,
      validationErrorService
    );

    expect(Util.formatErrorMessage).toHaveBeenCalledWith(
      validatorOptions.defaultErrorMessage,
      []
    );
  });

  it('should pass [] as args param to formatErrorMessage when option is undefined', () => {
    spyOn(Util, 'formatErrorMessage');

    Util.validate(
      formControl,
      elementRef,
      option,
      validatorOptions,
      validationErrorService
    );

    expect(Util.formatErrorMessage).toHaveBeenCalledWith(
      validatorOptions.defaultErrorMessage,
      []
    );
  });

  it('should pass [args] as args param to formatErrorMessage when args is not an array', () => {
    option = {
      args: 'arg0'
    };
    spyOn(Util, 'formatErrorMessage');

    Util.validate(
      formControl,
      elementRef,
      option,
      validatorOptions,
      validationErrorService
    );

    expect(Util.formatErrorMessage).toHaveBeenCalledWith(
      validatorOptions.defaultErrorMessage,
      [option.args]
    );
  });

  it('should pass [args] as args param to formatErrorMessage when args is an array', () => {
    option = {
      args: ['arg0']
    };
    spyOn(Util, 'formatErrorMessage');

    Util.validate(
      formControl,
      elementRef,
      option,
      validatorOptions,
      validationErrorService
    );

    expect(Util.formatErrorMessage).toHaveBeenCalledWith(
      validatorOptions.defaultErrorMessage,
      option.args
    );
  });

  it('should pass [option] as args param to formatErrorMessage when option is not an object', () => {
    option = 'arg0';
    spyOn(Util, 'formatErrorMessage');

    Util.validate(
      formControl,
      elementRef,
      option,
      validatorOptions,
      validationErrorService
    );

    expect(Util.formatErrorMessage).toHaveBeenCalledWith(
      validatorOptions.defaultErrorMessage,
      [option]
    );
  });

  it('should call validationErrprService.validate() with correct params', () => {
    spyOn(validationErrorService, 'validate');

    Util.validate(
      formControl,
      elementRef,
      option,
      validatorOptions,
      validationErrorService
    );

    expect(validationErrorService.validate).toHaveBeenCalledWith(
      elementRef.nativeElement,
      formControl,
      validatorFnResult,
      validatorOptions.defaultErrorMessage,
      async
    );
  });
});
