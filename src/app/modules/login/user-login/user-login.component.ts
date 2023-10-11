import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { ManualLoginService } from '../../../services/manual-login.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent {
  constructor(private users: ManualLoginService, private router: Router) {}

  display: boolean = true;
  title = 'Trello lite';

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  onSubmit() {
    if (!this.loginForm.invalid) {
      this.users.loginUser(this.loginForm.value).subscribe((response: any) => {
        if (response.status === 'not exists') {
          Swal.fire({
            title: `${response.message}`,
            icon: 'error',
            showConfirmButton: false,
            timer: 1500,
          });
        } else if (response.status === 'incorrect password') {
          Swal.fire({
            title: `${response.message}`,
            icon: 'error',
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          this.loginForm.reset();
          localStorage.setItem('user', response.token);
          this.router.navigate(['/dashboard']);
        }
      });
    }
  }

  setDisplay() {
    this.display = false;
  }
}
