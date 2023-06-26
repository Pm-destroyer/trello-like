import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewContainerRef,
  ComponentFactoryResolver,
  ViewChild,
  ElementRef,
  ComponentRef,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { TaskService } from '../../../services/task.service';
import { ManualLoginService } from '../../../services/manual-login.service';

declare var $: any;

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  myModal!: ViewContainerRef;

  @Input() activityId!: number;
  @Input() taskDetails!: any;
  @Output() getTask: EventEmitter<any> = new EventEmitter();
  @Output() getActivities: EventEmitter<any> = new EventEmitter();

  constructor(private task: TaskService, private users: ManualLoginService) {}

  userId!: number;
  addedMembers!: number[];
  taskId!: number;

  editTaskForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(250),
    ]),
  });

  ngOnInit() {
    this.getTask.emit(this.activityId);
    this.getUserId();
  }

  getUserId() {
    this.users.getUsers().subscribe((response: any) => {
      this.userId = response.id;
    });
  }

  showOptions(index: number, status: number) {
    const threeDots = document.getElementById('threeDot-' + index);

    if (threeDots) {
      threeDots.style.display = 'inline';
    }
  }

  hideOptions(index: number, status: number) {
    const threeDots = document.getElementById('threeDot-' + index);
    const task = document.getElementById('task-' + index);

    if (threeDots) {
      threeDots.style.display = 'none';
    }
  }

  onClickOptions(index: number) {
    const threeDots = document.getElementById('options-' + index);

    if (threeDots) {
      threeDots.style.display = 'block';
    }
  }

  clickOutside(index: number) {
    const threeDots = document.getElementById('options-' + index);

    if (threeDots) {
      threeDots.style.display = 'none';
    }
  }

  onEdit(id: number, value: string) {
    const div = document.getElementById('task-' + id)!;
    const form = document.getElementById('editTaskForm-' + id)!;
    const input = document.getElementById('taskEdit-' + id)!;

    this.editTaskForm.patchValue({
      name: value,
    });

    div.style.display = 'none';
    form.style.display = 'block';

    input?.focus();
  }

  editTask(id: number) {
    const div = document.getElementById('task-' + id)!;
    const form = document.getElementById('editTaskForm-' + id)!;

    if (!this.editTaskForm.invalid) {
      const updatedFormValue = {
        ...this.editTaskForm.value,
        id: id,
        status: 0,
        userId: this.userId,
        activityId: this.activityId,
      };

      this.task.editTask(updatedFormValue).subscribe((response: any) => {
        this.editTaskForm.reset();

        this.getTask.emit(this.activityId);
        this.getActivities.emit();
      });
    }

    this.editTaskForm.reset();
    this.editTaskForm.patchValue({
      name: '',
    });

    div.style.display = 'block';
    form.style.display = 'none';
  }

  markAsDone(id: number, status: number) {
    const updatedFormValue = {
      status: status,
      activityId: this.activityId,
      id: id,
      userId: this.userId,
    };

    this.task.markAsDone(updatedFormValue).subscribe((response: any) => {
      this.getTask.emit(this.activityId);
      this.getActivities.emit();
    });
  }

  async manageVisibility(taskId: number) {
    this.task.addedMembers(taskId).subscribe((response: any) => {
      console.log(response);
      this.addedMembers = response.visibleTo;
      this.taskId = response.id;
    });
  }
}
