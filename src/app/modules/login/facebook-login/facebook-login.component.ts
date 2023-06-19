import { Component } from '@angular/core';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { FacebookLoginProvider } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-facebook-login',
  template: `
    <div class="d-grid gap-2 my-2">
      <button
        class="btn btn-outline-primary login-buttons"
        (click)="signInWithFB()"
      >
        <i class="bi bi-facebook"></i>
        <span> Continue with Facebook </span>
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
export class FacebookLoginComponent {
  constructor(private authService: SocialAuthService) {}

  signInWithFB(): void {
    this.authService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((user: any) => {
        console.log(user);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  signOut(): void {
    this.authService.signOut();
  }
}
