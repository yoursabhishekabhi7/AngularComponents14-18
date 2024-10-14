import { TestBed } from '@angular/core/testing';

import { ReactiveJsonFormsService } from './reactive-json-forms.service';

describe('ReactiveJsonFormsService', () => {
  let service: ReactiveJsonFormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReactiveJsonFormsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
