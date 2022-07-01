import { TestBed } from '@angular/core/testing';

import { StardevcgroupService } from './stardevcgroup.service';

describe('StardevcgroupService', () => {
  let service: StardevcgroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StardevcgroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
