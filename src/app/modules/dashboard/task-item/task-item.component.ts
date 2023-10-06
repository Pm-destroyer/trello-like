import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { TaskService } from '../../../services/task.service';
import { ManualLoginService } from '../../../services/manual-login.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  myModal!: ViewContainerRef;

  @Input() activityId!: number;
  @Input() userId!: number;
  @Input() taskDetails!: any;
  @Input() boardAdmin!: any;
  @Output() getTask: EventEmitter<any> = new EventEmitter();
  @Output() getActivities: EventEmitter<any> = new EventEmitter();

  constructor(
    private task: TaskService,
    private users: ManualLoginService,
    private route: ActivatedRoute
  ) {}

  addedMembers!: number[];
  taskId!: number;
  activityID!: number;
  taskPriorityid!: number;

  visibilityList: any[] = [];
  membersDrop: any[] = [];
  projectId!: string;
  isManageVisibilityComplete: boolean = false;

  editTaskForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(250),
    ]),
  });

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.projectId = params.get('projectId')!;
    });

    this.getTask.emit(this.activityId);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.activityID = this.activityId;
  }

  getTaskDetails() {
    this.getTask.emit(this.activityId);
  }

  showOptions(index: number, status: number) {
    const threeDots = document.getElementById('threeDot-' + index);

    if (threeDots) {
      threeDots.style.display = 'inline';
    }
  }

  hideOptions(index: number, status: number) {
    const threeDots = document.getElementById('threeDot-' + index);

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

  asciiToHex = (str: string) => {
    const arr1 = [];
    for (let n = 0, l = str.length; n < l; n++) {
      const hex = Number(str.charCodeAt(n)).toString(16);
      arr1.push(hex);
    }

    return arr1.join('');
  };

  async manageVisibility(taskId: number) {
    this.task.addedMembers(taskId).subscribe((response: any) => {
      this.addedMembers = response.visibleTo;
      this.taskId = response.id;
      console.log(this.taskId);
      this.isManageVisibilityComplete = true;
    });

    if (this.userId && this.projectId) {
      this.users
        .userDropByWorkspace(this.userId, this.projectId)
        .subscribe((response: any) => {
          this.membersDrop = response;
        });
    }
  }

  onSubmit(form: any) {
    console.log(this.taskId);

    if (!this.isManageVisibilityComplete) {
      // Wait for manageVisibility() to complete before calling onSubmit()
      return;
    }

    console.log(form);
    console.log(this.taskId);
  }

  openPriority(event: Event) {
    const elem = event.target as HTMLElement;

    this.task.setTaskId(+elem.id);
  }
}
