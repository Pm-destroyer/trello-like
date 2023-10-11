import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  constructor() {}

  isOpen: boolean = false;

  private sidebarWidthSubject = new BehaviorSubject<number>(
    this.isOpen ? 250 : 60
  );

  sidebarWidth$ = this.sidebarWidthSubject.asObservable();

  toggleSidebar() {
    this.isOpen = !this.isOpen;

    this.setSidebarWidth();
  }

  setSidebarWidth() {
    this.sidebarWidthSubject.next(this.isOpen ? 250 : 60);
  }

  calcWidth(sidebarWidth: number): number {
    const viewportWidth = window.innerWidth;
    const calculatedWidth = viewportWidth - sidebarWidth;
    return calculatedWidth;
  }
}
