import { TestBed } from '@angular/core/testing';

import { BioService } from './bioservice';

describe('Bioservice', () => {
  let service: BioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
