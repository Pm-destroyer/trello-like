import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent {
  @Input() activityIndex!: number;
  @Input() activityId!: number;
  @Input() userId!: number;

  @Output() getTask: EventEmitter<any> = new EventEmitter();

  constructor(private task: TaskService) {}

  activityDetails: any;
  projectId!: string;
  boardId!: string;

  addTaskForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(250),
    ]),
  });

  onCancel() {
    const div = document.getElementById('addTask-' + this.activityIndex)!;
    const form = document.getElementById('addTaskForm-' + this.activityIndex)!;

    if (!this.addTaskForm.invalid) {
      const updatedFormValue = {
        ...this.addTaskForm.value,
        activityId: this.activityId,
        userId: this.userId,
      };

      this.task.addTask(updatedFormValue).subscribe((response: any) => {
        this.addTaskForm.reset();

        this.getTask.emit(this.activityId);
      });
    }

    this.addTaskForm.reset();
    this.addTaskForm.patchValue({
      name: '',
    });

    div.style.display = 'block';
    form.style.display = 'none';
  }

  showAddActivity() {
    const div = document.getElementById('addTask-' + this.activityIndex)!;
    const form = document.getElementById('addTaskForm-' + this.activityIndex)!;
    const input = document.getElementById('taskInput-' + this.activityIndex)!;

    console.log(input);

    div.style.display = 'none';
    form.style.display = 'block';

    input?.focus();
  }
}
