import { Component, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { WorkspaceService } from '../../../services/workspace.service';
import { BoardService } from '../../../services/board.service';
import { ManualLoginService } from '../../../services/manual-login.service';

@Component({
  selector: 'app-workspace-item',
  templateUrl: './workspace-item.component.html',
  styleUrls: ['./workspace-item.component.scss'],
})
export class WorkspaceItemComponent {
  @Output() getWorkspace: EventEmitter<any> = new EventEmitter();

  id!: string;
  workspaceDetails: any;
  userId!: number;
  username!: string;
  boards: any[] = [];
  memberLists: any[] = [];
  membersDrop: any[] = [];
  members!: string;

  constructor(
    private route: ActivatedRoute,
    private workspace: WorkspaceService,
    private board: BoardService,
    private users: ManualLoginService
  ) {}

  WorkspaceHeadingForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-z A-Z0-9\.,]{3,50}$/),
    ]),
  });

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('workspaceId')!;
      this.getWorkspaceDetails(this.id);

      this.users.getUsers().subscribe((response: any) => {
        this.userId = response.id;

        this.getboard(response.id, this.id);
      });
    });
  }

  getWorkspaceDetails(id: string) {
    this.workspace.viewById(id).subscribe((response: any) => {
      this.workspaceDetails = response;
      this.memberLists = response.memberLists;
      this.members = response.members;
      this.username = response.user.username;
    });
  }

  getboard(userId: any, workspaceId: string) {
    this.boards = [];
    this.board.viewBoard(userId, workspaceId).subscribe((response: any) => {
      this.boards = this.boards.concat(response);
    });
  }

  removeMember(
    member: number,
    memberName: string,
    userId: any,
    workspaceId: any
  ) {
    const updateMember = {
      members: this.members
        .split(',')
        .filter((item) => parseInt(item) !== member && item !== ''),
      userId: userId,
      workspaceId: workspaceId,
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
        this.workspace.removeMember(updateMember).subscribe((response: any) => {
          this.getWorkspaceDetails(this.id);

          this.fetchUserList();

          Swal.fire({
            title: `${memberName} has been removed from this workspace.`,
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          });
        });
      }
    });
  }

  fetchUserList() {
    if (this.userId && this.id) {
      this.users
        .getUserList(this.userId, this.id)
        .subscribe((response: any) => {
          this.membersDrop = response;
        });
    }
  }

  showHeadingEdit(id: number, value: string) {
    if (this.userId === this.workspaceDetails.userId) {
      const heading = document.getElementById('h-' + id);
      const form = document.getElementById('form-' + id);
      const input = document.getElementById('input-' + id);

      heading!.style.display = 'none';
      form!.style.display = 'inline';

      this.WorkspaceHeadingForm.patchValue({
        name: value,
      });

      input?.focus();
    }
  }

  editHeading(id: string) {
    const heading = document.getElementById('h-' + id);
    const form = document.getElementById('form-' + id);

    if (!this.WorkspaceHeadingForm.invalid) {
      const updatedFormValue = {
        ...this.WorkspaceHeadingForm.value,
        id: id,
      };

      this.workspace
        .editWorkspace(updatedFormValue)
        .subscribe((response: any) => {
          this.getWorkspaceDetails(this.id);

          heading!.style.display = 'block';
          form!.style.display = 'none';
        });
    }
  }
}
