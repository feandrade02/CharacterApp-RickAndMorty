import { TestBed } from '@angular/core/testing';

import { HeaderstateService } from './headerstate.service';

describe('HeaderstateService', () => {
  let service: HeaderstateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderstateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
