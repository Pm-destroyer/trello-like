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
    console.log('Sidebar width updated:', width);
  }
}
