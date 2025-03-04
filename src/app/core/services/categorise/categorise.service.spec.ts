import { TestBed } from '@angular/core/testing';

import { CategoriseService } from './categorise.service';

describe('CategoriseService', () => {
  let service: CategoriseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
