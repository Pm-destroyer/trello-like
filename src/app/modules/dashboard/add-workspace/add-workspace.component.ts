import { Component, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { WorkspaceService } from '../../../services/workspace.service';
import { ManualLoginService } from '../../../services/manual-login.service';

@Component({
  selector: 'app-add-workspace',
  templateUrl: './add-workspace.component.html',
  styleUrls: ['./add-workspace.component.scss'],
})
export class AddWorkspaceComponent {
  @ViewChild('modalclose') modalclose: any;
  @Output() getWorkspace: EventEmitter<any> = new EventEmitter();

  constructor(
    private workspace: WorkspaceService,
    private users: ManualLoginService
  ) {}

  display: boolean = false;
  userId!: number;
  workspaceTypes: any[] = [];

  addWorkspaceForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-z A-Z0-9\.,]{3,50}$/),
    ]),
    type: new FormControl('select', [Validators.pattern(/^(?!select$).*$/)]),
    description: new FormControl('', [Validators.maxLength(150)]),
  });

  ngOnInit() {
    this.workspace.workspaceTypeDropdown().subscribe((response: any) => {
      this.workspaceTypes = this.workspaceTypes.concat(response);
    });

    this.getUserId();
  }

  getUserId() {
    this.users.getUsers().subscribe((response: any) => {
      this.userId = response.id;
    });
  }

  onSubmit() {
    if (!this.addWorkspaceForm.invalid) {
      this.display = false;

      const updatedFormValue = {
        ...this.addWorkspaceForm.value,
        userId: this.userId,
      };

      this.workspace
        .addWorkspace(updatedFormValue)
        .subscribe((response: any) => {
          this.addWorkspaceForm.reset();

          this.getWorkspace.emit(this.userId);

          this.modalclose.nativeElement.click();

          Swal.fire({
            title: `Your workspace has been added succesfully`,
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
    this.addWorkspaceForm.reset();
    this.addWorkspaceForm.patchValue({
      name: '',
      type: 'select',
      description: '',
    });
  }
}
