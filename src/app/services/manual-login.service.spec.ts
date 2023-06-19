import { TestBed } from '@angular/core/testing';

import { ManualLoginService } from './manual-login.service';

describe('ManualLoginService', () => {
  let service: ManualLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManualLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
