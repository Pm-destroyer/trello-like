import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authWorkspaceGuard } from './auth-workspace.guard';

describe('authWorkspaceGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authWorkspaceGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
