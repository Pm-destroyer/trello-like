import {
  Component,
  Output,
  ViewChild,
  EventEmitter,
  Input,
} from '@angular/core';
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
  @ViewChild('modalclose') modalclose: any;
  @Output() getactivity: EventEmitter<any> = new EventEmitter();
  @Input() boardId!: string;

  constructor(
    private activity: ActivityService,
    private users: ManualLoginService
  ) {}

  display: boolean = false;
  userId!: number;

  addActivityForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-z A-Z0-9\.,]{3,50}$/),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(200),
    ]),
  });

  ngOnInit() {
    this.getUserId();
  }

  getUserId() {
    this.users.getUsers().subscribe((response: any) => {
      this.userId = response.id;
    });
  }

  onSubmit() {
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

        this.modalclose.nativeElement.click();

        Swal.fire({
          title: `Your activity has been added succesfully`,
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
      });
    } else {
      this.display = true;
    }
  }

  onCancel() {
    this.addActivityForm.reset();
    this.addActivityForm.patchValue({
      name: '',
      description: '',
    });
  }
}
