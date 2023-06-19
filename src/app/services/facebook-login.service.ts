import { Injectable } from '@angular/core';

import { FacebookConfig } from '../../facebook-config';

declare const FB: any;

@Injectable({
  providedIn: 'root',
})
export class FacebookLoginService {
  private initialized = false;

  constructor() {}

  initializeFacebookLogin(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this.initialized) {
        resolve();
      } else {
        FB.init(FacebookConfig);
        FB.AppEvents.logPageView();
        this.initialized = true;
        resolve();
      }
    });
  }

  loginWithFacebook(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      FB.login(
        (response: any) => {
          if (response.authResponse) {
            resolve(response);
          } else {
            reject('User cancelled login or did not fully authorize.');
          }
        },
        { scope: 'public_profile,email' }
      );
    });
  }

  getUserProfileDetails(userId: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      FB.api(`/${userId}`, { fields: 'name,email' }, (response: any) => {
        if (response.error) {
          reject(response.error);
        } else {
          resolve(response);
        }
      });
    });
  }
}
