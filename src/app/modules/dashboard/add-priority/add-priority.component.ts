import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-add-priority',
  templateUrl: './add-priority.component.html',
  styleUrls: ['./add-priority.component.scss'],
})
export class AddPriorityComponent {
  constructor(private task: TaskService) {}

  addPriorityForm = new FormGroup({
    name: new FormControl('select', [Validators.pattern(/^(?!select$).*$/)]),
  });
}
