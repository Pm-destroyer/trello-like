import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  constructor() {}

  private sidebarWidthSubject = new BehaviorSubject<number>(60); // Default width
  sidebarWidth$ = this.sidebarWidthSubject.asObservable();

  setSidebarWidth(width: number) {
    this.sidebarWidthSubject.next(width);
  }

  calcWidth(sidebarWidth: number): number {
    const viewportWidth = window.innerWidth;
    const calculatedWidth = viewportWidth - sidebarWidth;
    return calculatedWidth;
  }
}
