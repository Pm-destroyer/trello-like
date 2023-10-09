import { Component, ElementRef, NgZone, Renderer2 } from '@angular/core';

import { SidebarService } from '../../../services/sidebar.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  title: string = 'Trello-like';
  isOpen: boolean = false;
  activeMenuItem!: string;

  constructor(private sidebarService: SidebarService, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setActiveMenuItemBasedOnRoute(event.url);
      }
    });
  }

  setActiveMenuItemBasedOnRoute(url: string) {
    if (url.includes('/dashboard')) {
      this.activeMenuItem = 'dashboard';
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
      this.activeMenuItem = 'dashboard';
    }
  }

  ngOnInit(): void {
    this.sidebarService.setSidebarWidth(60);
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;

    this.sidebarService.setSidebarWidth(this.isOpen ? 250 : 60);
  }

  logout() {
    localStorage.removeItem('user');
  }
}
