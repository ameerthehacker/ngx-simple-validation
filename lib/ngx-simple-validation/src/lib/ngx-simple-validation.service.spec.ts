import { TestBed, inject } from '@angular/core/testing';

import { NgxSimpleValidationService } from './ngx-simple-validation.service';

describe('NgxSimpleValidationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxSimpleValidationService]
    });
  });

  it('should be created', inject([NgxSimpleValidationService], (service: NgxSimpleValidationService) => {
    expect(service).toBeTruthy();
  }));
});
