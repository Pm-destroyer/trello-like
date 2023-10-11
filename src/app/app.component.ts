import { Component } from '@angular/core';

import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Trello lite';
  loggedIn: boolean = localStorage.getItem('user') !== null;
  showLoginModule!: NavbarComponent['showLoginModule'];
}
