import { Component } from '@angular/core';

import { SidebarService } from '../../../services/sidebar.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  title: string = 'Trello lite';
  isOpen: boolean = false;
  activeMenuItem!: string;

  constructor(public sidebarService: SidebarService, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setActiveMenuItemBasedOnRoute(event.url);
      }
    });
  }

  setActiveMenuItemBasedOnRoute(url: string) {
    if (url.includes('/project-dashboard')) {
      this.activeMenuItem = 'project-dashboard';
    } else if (url.includes('/tasks')) {
      this.activeMenuItem = 'tasks';
    } else if (url.includes('/boards')) {
      this.activeMenuItem = 'boards';
    } else if (url.includes('/members')) {
      this.activeMenuItem = 'members';
    } else if (url.includes('/statistics')) {
      this.activeMenuItem = 'statistics';
    } else if (url.includes('/settings')) {
      this.activeMenuItem = 'settings';
    } else {
      this.activeMenuItem = 'project-dashboard';
    }
  }

  ngOnInit(): void {
    this.sidebarService.setSidebarWidth();
  }

  logout() {
    localStorage.removeItem('user');
  }
}
