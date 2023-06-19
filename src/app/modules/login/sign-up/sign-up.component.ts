import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ManualLoginService } from '../../../services/manual-login.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  constructor(private users: ManualLoginService, private router: Router) {}

  display: boolean = false;
  message: string = '';
  title = 'Trello-Like';

  signupForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  onSubmit() {
    if (
      !this.signupForm.invalid &&
      this.signupForm.value.password === this.signupForm.value.confirmPassword
    ) {
      this.display = false;

      this.users.addUser(this.signupForm.value).subscribe((response: any) => {
        if (response.status === 'exist') {
          this.display = true;
          this.message = response.message;
        } else {
          this.signupForm.reset();
          this.router.navigate(['/login']);
        }
      });
    } else {
      this.display = true;
    }
  }

  setDisplay() {
    this.display = false;
  }
}
