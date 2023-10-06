import { Component, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-add-priority',
  templateUrl: './add-priority.component.html',
  styleUrls: ['./add-priority.component.scss'],
})
export class AddPriorityComponent {
  @ViewChild('modalclose') modalclose: any;
  @Input() taskId!: any;

  constructor(private task: TaskService) {}

  priorityList!: any[];
  display: boolean = false;

  addPriorityForm = new FormGroup({
    priorityId: new FormControl('select', [
      Validators.pattern(/^(?!select$).*$/),
    ]),
  });

  ngOnInit() {
    this.task.priorityList().subscribe((response: any) => {
      this.priorityList = response;
    });
  }

  onSubmit() {
    if (!this.addPriorityForm.invalid) {
      const updatedFormValue = {
        ...this.addPriorityForm.value,
        id: this.task.getTaskId(),
      };

      this.task.addTaskPriority(updatedFormValue).subscribe((response: any) => {
        this.addPriorityForm.reset();

        this.addPriorityForm.patchValue({
          priorityId: 'select',
        });

        this.modalclose.nativeElement.click();
      });
    } else {
      this.display = true;
    }
  }

  onCancel() {
    this.addPriorityForm.patchValue({
      priorityId: 'select',
    });
  }
}
