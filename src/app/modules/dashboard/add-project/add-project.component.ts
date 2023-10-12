import { Component, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { ProjectService } from '../../../services/project.service';
import { ManualLoginService } from '../../../services/manual-login.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
})
export class AddProjectComponent {
  @ViewChild('modalclose') modalclose: any;
  @Output() getProject: EventEmitter<any> = new EventEmitter();

  constructor(
    private project: ProjectService,
    private users: ManualLoginService
  ) {}

  display: boolean = false;
  userId!: number;
  projectTypes: any[] = [];

  addProjectForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-z A-Z0-9\.,]{3,50}$/),
    ]),
    type: new FormControl('select', [Validators.pattern(/^(?!select$).*$/)]),
    description: new FormControl('', [Validators.maxLength(150)]),
    start_date: new FormControl('', Validators.required),
    end_date: new FormControl('', Validators.required),
    est_max_costs: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9\.,]{1,50}$/),
    ]),
    cost_type: new FormControl('select', [
      Validators.pattern(/^(?!select$).*$/),
    ]),
  });

  ngOnInit() {
    this.project.projectTypeDropdown().subscribe((response: any) => {
      this.projectTypes = this.projectTypes.concat(response);
    });

    this.getUserId();
  }

  getUserId() {
    this.users.getUsers().subscribe((response: any) => {
      this.userId = response.id;
    });
  }

  onSubmit() {
    if (!this.addProjectForm.invalid) {
      this.display = false;

      const updatedFormValue = {
        ...this.addProjectForm.value,
        userId: this.userId,
      };

      this.project.addProject(updatedFormValue).subscribe((response: any) => {
        this.addProjectForm.reset();

        this.getProject.emit(this.userId);

        this.modalclose.nativeElement.click();

        Swal.fire({
          title: `Your project has been added succesfully`,
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
    this.addProjectForm.reset();
    this.addProjectForm.patchValue({
      name: '',
      type: 'select',
      description: '',
      start_date: '',
      end_date: '',
      est_max_costs: '',
      cost_type: 'select',
    });
  }
}
