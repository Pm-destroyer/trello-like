import { Component, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { ActivityService } from '../../../services/activity.service';
import { ManualLoginService } from '../../../services/manual-login.service';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-activity-item',
  templateUrl: './activity-item.component.html',
  styleUrls: ['./activity-item.component.scss'],
})
export class ActivityItemComponent {
  @Input() boardAdmin!: any;
  @Input() userId!: number;

  constructor(
    private activity: ActivityService,
    private users: ManualLoginService,
    private task: TaskService,
    private route: ActivatedRoute
  ) {}

  activityDetails: any;
  taskDetails: { [activityId: number]: any } = {};
  workspaceId!: string;
  boardId!: string;
  visibilityList: any = [];

  activityHeadingForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-z A-Z0-9\.,]{3,50}$/),
    ]),
  });

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.workspaceId = params.get('workspaceId')!;
      this.boardId = params.get('boardId')!;

      this.getActivities(this.boardId, this.userId, this.workspaceId);
    });
  }

  getActivities(id: string, userId: number, workspaceId: string) {
    this.activity
      .viewActivity(id, userId, workspaceId)
      .subscribe((response: any) => {
        this.activityDetails = response;
      });
  }

  deleteActivity(id: number, userId: number) {
    this.activity.isAuthorizedToDelete(id, userId).subscribe((result: any) => {
      if (result.status === 'yes') {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          confirmButtonText:
            'Delete! <i class="bi bi-hand-thumbs-up-fill"></i>',
          confirmButtonAriaLabel: 'Thumbs up, great!',
          cancelButtonColor: '#d33',
          cancelButtonText:
            'Cancel <i class="bi bi-hand-thumbs-down-fill"></i>',
          cancelButtonAriaLabel: 'Thumbs down',
        }).then((result) => {
          if (result.isConfirmed) {
            this.activity.deleteActivity(id).subscribe((response: any) => {
              this.getActivities(this.boardId, this.userId, this.workspaceId);
              if (response.status) {
                Swal.fire({
                  title: 'Your record has been deleted.',
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            });
          }
        });
      } else {
        Swal.fire({
          title: `${result.status}`,
          icon: 'error',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }

  showActivityHeadingEdit(id: string, value: string) {
    const heading = document.getElementById('activityHeading-' + id);
    const form = document.getElementById('activityform-' + id);
    const input = document.getElementById('activityinput-' + id);

    heading!.style.display = 'none';
    form!.style.display = 'inline';

    this.activityHeadingForm.patchValue({
      name: value,
    });

    input?.focus();
  }

  editactivityHeading(id: string) {
    const heading = document.getElementById('activityHeading-' + id);
    const form = document.getElementById('activityform-' + id);

    if (!this.activityHeadingForm.invalid) {
      const updatedFormValue = {
        ...this.activityHeadingForm.value,
        id: id,
      };

      this.activity
        .editActivity(updatedFormValue)
        .subscribe((response: any) => {
          this.getActivities(this.boardId, this.userId, this.workspaceId);

          heading!.style.display = 'block';
          form!.style.display = 'none';
        });
    }
  }

  getTask(activityId: number) {
    this.task.viewTask(activityId).subscribe((response: any) => {
      this.taskDetails[activityId] = response;
    });
  }
}
