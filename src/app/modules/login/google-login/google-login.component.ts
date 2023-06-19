import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';

import { ManualLoginService } from '../../../services/manual-login.service';

@Component({
  selector: 'app-google-login',
  template: `
    <div class="d-grid gap-2 my-2">
      <button
        class="btn btn-outline-secondary login-buttons"
        (click)="signInWithGoogle()"
      >
        <img src="../../assets/sign-in-with-google.svg" />
        <span> Continue with Google </span>
      </button>
    </div>
  `,
  styles: [
    `
      span {
        font-weight: 600;
      }
    `,
  ],
})
export class GoogleLoginComponent {
  user!: SocialUser;
  loggedIn: boolean = localStorage.getItem !== null;

  constructor(
    private authService: SocialAuthService,
    private httpClient: HttpClient,
    private users: ManualLoginService,
    private router: Router
  ) {}

  signInWithGoogle(): void {
    this.authService
      .getAccessToken(GoogleLoginProvider.PROVIDER_ID)
      .then((accessToken) => {
        if (!accessToken) return;

        this.httpClient
          .get(
            `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`
          )
          .subscribe((user: any) => {
            this.users
              .loginUser({ username: user.email })
              .subscribe((response: any) => {
                localStorage.setItem('user', response.token);
                this.loggedIn = localStorage.getItem !== null;
                this.router.navigate(['/dashboard']);
              });
          });
      });
  }

  signOut(): void {
    this.authService.signOut();
  }
}
