import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  GoogleInitOptions,
  FacebookLoginProvider,
} from '@abacritt/angularx-social-login';

import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { LoginRoutingModule } from './login-routing.module';
import { UserLoginComponent } from './user-login/user-login.component';
import { GoogleLoginComponent } from './google-login/google-login.component';
import { FacebookLoginComponent } from './facebook-login/facebook-login.component';
import { LinkedinLoginComponent } from './linkedin-login/linkedin-login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const fbLoginOptions = {
  scope:
    'pages_messaging,pages_messaging_subscriptions,email,pages_show_list,manage_pages',
  return_scopes: true,
  enable_profile_selector: true,
};

const googleLoginOptions: GoogleInitOptions = {
  oneTapEnabled: false,
  scopes: ['profile', 'email'],
};

@NgModule({
  declarations: [
    UserLoginComponent,
    GoogleLoginComponent,
    FacebookLoginComponent,
    LinkedinLoginComponent,
    SignUpComponent,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '340049694100-tfqt7iq3dgq7js5q9ou8j9jima93oam1.apps.googleusercontent.com',
              googleLoginOptions
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(
              '1629476760890515',
              fbLoginOptions
            ),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    UserLoginComponent,
    GoogleLoginComponent,
    FacebookLoginComponent,
    LinkedinLoginComponent,
  ],
})
export class LoginModule {}
