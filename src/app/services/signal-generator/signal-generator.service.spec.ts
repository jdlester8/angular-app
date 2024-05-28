import { TestBed } from '@angular/core/testing';

import { SignalGeneratorService } from './signal-generator.service';

describe('SignalGeneratorService', () => {
  let service: SignalGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignalGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
