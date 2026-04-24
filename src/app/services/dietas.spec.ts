import { TestBed } from '@angular/core/testing';

import { Dietas } from './dietas';

describe('Dietas', () => {
  let service: Dietas;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Dietas);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
