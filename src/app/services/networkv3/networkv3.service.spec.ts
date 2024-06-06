import { TestBed } from '@angular/core/testing';

import { Networkv3Service } from './networkv3.service';

describe('Networkv3Service', () => {
  let service: Networkv3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Networkv3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
