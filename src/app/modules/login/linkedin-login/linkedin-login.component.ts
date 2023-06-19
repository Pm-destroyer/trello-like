import { Component } from '@angular/core';

@Component({
  selector: 'app-linkedin-login',
  template: `
    <div class="d-grid gap-2 my-2">
      <button class="btn btn-outline-primary login-buttons">
        <i class="bi bi-linkedin"></i>
        <span> Continue with Linked In </span>
      </button>
    </div>
  `,
  styles: [`
    span {
      font-weight: 600;
    }
  `],
})
export class LinkedinLoginComponent {}
