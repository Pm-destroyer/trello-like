import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { ManualLoginService } from '../../../services/manual-login.service';
import { ActivityService } from '../../../services/activity.service';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.scss'],
})
export class AddActivityComponent {
  @Output() getactivity: EventEmitter<any> = new EventEmitter();
  @Input() boardId!: string;
  @Input() userId!: number;

  constructor(
    private activity: ActivityService,
    private users: ManualLoginService
  ) {}

  display: boolean = false;

  addActivityForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-z A-Z0-9\.,]{3,50}$/),
    ]),
  });

  onSubmit() {
    const div = document.getElementById('addActivity')!;
    const form = document.getElementById('addActivityForm')!;

    if (!this.addActivityForm.invalid) {
      this.display = false;

      const updatedFormValue = {
        ...this.addActivityForm.value,
        boardId: this.boardId,
        userId: this.userId,
      };

      this.activity.addActivity(updatedFormValue).subscribe((response: any) => {
        this.addActivityForm.reset();

        this.getactivity.emit(this.userId);

        div.style.display = 'block';
        form.style.display = 'none';
      });
    } else {
      this.display = true;
    }
  }

  onCancel() {
    const div = document.getElementById('addActivity')!;
    const form = document.getElementById('addActivityForm')!;

    this.addActivityForm.reset();
    this.addActivityForm.patchValue({
      name: '',
    });

    this.display = false;

    div.style.display = 'block';
    form.style.display = 'none';
  }

  showAddActivity() {
    const div = document.getElementById('addActivity')!;
    const form = document.getElementById('addActivityForm')!;
    const input = document.getElementById('addInput')!;

    div.style.display = 'none';
    form.style.display = 'block';

    input?.focus();
  }
}
