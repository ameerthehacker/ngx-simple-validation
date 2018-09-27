import { TestBed, inject } from '@angular/core/testing';

import { ValidationErrorService } from './validation-error.service';

describe('ValidationErrorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidationErrorService]
    });
  });

  it('should be created', inject([ValidationErrorService], (service: ValidationErrorService) => {
    expect(service).toBeTruthy();
  }));
});
