import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthServiceService } from '../services/auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthWorkspaceGuard {
  constructor(
    private router: Router,
    private authService: AuthServiceService
  ) {}

  canActivate: CanActivateFn = (
    next: ActivatedRouteSnapshot
  ): boolean | UrlTree => {
    const workspaceId = +next.params['workspaceId'];

    if (localStorage.getItem('user')) {
      this.authService
        .isAuthorized(workspaceId)
        .subscribe((authorized: boolean) => {
          if (authorized) {
            return true;
          } else {
            return this.router.parseUrl('/notfoundpage');
          }
        });
    }
  };
}
