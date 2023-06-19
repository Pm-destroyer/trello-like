import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  template: `
    <div class="container my-4">
      <h1 class="text-light text-center mb-4">
        Oops! the page you are looking for is not found.
      </h1>
      <div class="d-grid gap-2">
        <button class="btn btn-primary mx-auto" (click)="goBack()">Back</button>
      </div>
    </div>
  `,
  styles: [],
})
export class NotFoundPageComponent {
  constructor(private route: ActivatedRoute) {
    const stateParam = this.route.snapshot.paramMap.get('state');
    this.state = stateParam !== null ? JSON.parse(stateParam) : null;
  }

  state!: any;

  goBack() {
    const previousUrl = this.state !== null ? this.state.previousUrl : null;

    if (previousUrl !== null) {
      history.go(-2);
    } else {
      history.go(-1);
    }
  }
}
