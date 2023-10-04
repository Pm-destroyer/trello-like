import { Component, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { ProjectService } from '../../../services/project.service';
import { BoardService } from '../../../services/board.service';
import { ManualLoginService } from '../../../services/manual-login.service';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
})
export class ProjectItemComponent {
  @Output() getproject: EventEmitter<any> = new EventEmitter();

  id!: string;
  projectDetails: any;
  project_admin!: number;
  username!: string;
  boards: any[] = [];
  memberLists: any[] = [];
  membersDrop: any[] = [];
  members!: string;

  constructor(
    private route: ActivatedRoute,
    private project: ProjectService,
    private board: BoardService,
    private users: ManualLoginService
  ) {}

  projectHeadingForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-z A-Z0-9\.,]{3,50}$/),
    ]),
  });

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('projectId')!;
      this.getProjectDetails(this.id);

      this.users.getUsers().subscribe((response: any) => {
        this.project_admin = response.id;

        this.getboard(response.id, this.id);
      });
    });
  }

  getProjectDetails(id: string) {
    this.project.viewById(id).subscribe((response: any) => {
      this.projectDetails = response;
      this.memberLists = response.memberLists;
      this.members = response.members;
      this.username = response.user.username;
    });
  }

  getboard(project_admin: any, projectId: string) {
    this.boards = [];
    this.board
      .viewBoard(project_admin, projectId)
      .subscribe((response: any) => {
        this.boards = this.boards.concat(response);
      });
  }

  removeMember(
    member: number,
    memberName: string,
    project_admin: any,
    projectId: any
  ) {
    const updateMember = {
      members: this.members
        .split(',')
        .filter((item) => parseInt(item) !== member && item !== ''),
      project_admin: project_admin,
      projectId: projectId,
    };

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Delete! <i class="bi bi-hand-thumbs-up-fill"></i>',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancel <i class="bi bi-hand-thumbs-down-fill"></i>',
      cancelButtonAriaLabel: 'Thumbs down',
    }).then((result) => {
      if (result.isConfirmed) {
        this.project.removeMember(updateMember).subscribe((response: any) => {
          this.getProjectDetails(this.id);

          this.fetchUserList();

          Swal.fire({
            title: `${memberName} has been removed from this project.`,
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          });
        });
      }
    });
  }

  fetchUserList() {
    if (this.project_admin && this.id) {
      this.users
        .getUserList(this.project_admin, this.id)
        .subscribe((response: any) => {
          this.membersDrop = response;
        });
    }
  }

  showHeadingEdit(id: number, value: string) {
    if (this.project_admin === this.projectDetails.project_admin) {
      const heading = document.getElementById('h-' + id);
      const form = document.getElementById('form-' + id);
      const input = document.getElementById('input-' + id);

      heading!.style.display = 'none';
      form!.style.display = 'inline';

      this.projectHeadingForm.patchValue({
        name: value,
      });

      input?.focus();
    }
  }

  editHeading(id: string) {
    const heading = document.getElementById('h-' + id);
    const form = document.getElementById('form-' + id);

    if (!this.projectHeadingForm.invalid) {
      const updatedFormValue = {
        ...this.projectHeadingForm.value,
        id: id,
      };

      this.project.editProject(updatedFormValue).subscribe((response: any) => {
        this.getProjectDetails(this.id);

        heading!.style.display = 'block';
        form!.style.display = 'none';
      });
    }
  }
}
