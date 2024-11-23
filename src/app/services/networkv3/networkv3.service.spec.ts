import { TestBed } from '@angular/core/testing';

import { GraphService } from './networkv3.service';

describe('Networkv3Service', () => {
  let service: GraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
