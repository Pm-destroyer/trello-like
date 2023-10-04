import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AuthServiceService } from '../services/auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  previousUrl!: string;

  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    const projectIdParam = route.paramMap.get('projectId');
    const projectId = projectIdParam ? projectIdParam : '';
    const userLoggedIn = localStorage.getItem('user') !== null;

    if (!userLoggedIn) {
      this.router.navigateByUrl('/login');
      return of(false);
    }

    if (projectId === '') {
      return of(true);
    }

    return this.authService.isAuthorized(projectId).pipe(
      switchMap((authorized: boolean) => {
        this.previousUrl = state.url;

        if (authorized) {
          return of(true);
        } else {
          return of(
            this.router.createUrlTree([
              '/notfoundpage',
              { state: JSON.stringify({ previousUrl: 'not accessible' }) },
            ])
          );
        }
      })
    );
  }
}
