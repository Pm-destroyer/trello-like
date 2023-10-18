import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { TaskService } from '../../../services/task.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent {
  @ViewChild('modalclose') modalclose: any;

  @Input() activityIndex!: number;
  @Input() activityId!: number;
  @Input() userId!: number;

  @Output() getTask: EventEmitter<any> = new EventEmitter();

  constructor(private task: TaskService, private route: ActivatedRoute) {}

  priorityList: any[] = [];
  projectId!: string;
  boardId!: string;
  display: boolean = false;

  addTaskForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    priorityId: new FormControl('select', [
      Validators.pattern(/^(?!select$).*$/),
    ]),
    estimated_hours: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9\.]{1,50}$/),
    ]),
    actual_hours: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9\.]{1,50}$/),
    ]),
    start_date: new FormControl('', Validators.required),
    end_date: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.projectId = params.get('projectId')!;
    });

    this.task.priorityList().subscribe((response: any) => {
      this.priorityList = response;
    });
  }

  onSubmit() {
    if (!this.addTaskForm.invalid) {
      this.display = false;

      const updatedFormValue = {
        ...this.addTaskForm.value,
        project_id: this.projectId,
      };

      this.task.addTask(updatedFormValue).subscribe((response: any) => {
        this.addTaskForm.reset();

        this.addTaskForm.patchValue({
          name: '',
          priorityId: 'select',
          estimated_hours: '',
          actual_hours: '',
          start_date: '',
          end_date: '',
        });

        this.modalclose.nativeElement.click();

        Swal.fire({
          title: `Your task has been added succesfully`,
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
    this.addTaskForm.reset();
    this.addTaskForm.patchValue({
      name: '',
      priorityId: 'select',
      estimated_hours: '',
      actual_hours: '',
      start_date: '',
      end_date: '',
    });

    this.display = false;
  }
}
