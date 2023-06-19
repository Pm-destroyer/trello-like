import { Injectable } from '@angular/core';
import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from 'angularx-social-login';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GoogleLoginService {
  private loggedInUser: SocialUser | null | undefined;

  constructor(private authService: SocialAuthService) {}

  signInWithGoogle(): void {
    console.log(this.authService);
    this.authService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((user) => {
        this.loggedInUser = user;
        console.log('Logged in user:', this.loggedInUser);
      })
      .catch((error) => {
        console.error(
          'Error occurred while signing in with Google:',
          this.authService
        );
      });
  }

  signOut(): void {
    this.authService
      .signOut()
      .then(() => {
        this.loggedInUser = null;
        console.log('User signed out');
      })
      .catch((error) => {
        console.error('Error occurred while signing out:', error);
      });
  }

  isLoggedIn(): boolean {
    return this.loggedInUser != null;
  }
}
