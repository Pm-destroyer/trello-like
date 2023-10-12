import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocialLoginModule } from '@abacritt/angularx-social-login';
import { DataTablesModule } from 'angular-datatables';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './modules/login/login.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
// import { ClickOutsideDirective } from './directives/click-outside.directive';

@NgModule({
  declarations: [AppComponent, NavbarComponent, NotFoundPageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    SocialLoginModule,
    DataTablesModule,
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
