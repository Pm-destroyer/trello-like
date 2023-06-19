import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { BoardService } from '../../../services/board.service';
import { ManualLoginService } from '../../../services/manual-login.service';
import { WorkspaceService } from '../../../services/workspace.service';
import { ActivityService } from '../../../services/activity.service';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss'],
})
export class BoardItemComponent {
  constructor(
    private route: ActivatedRoute,
    private board: BoardService,
    private workspace: WorkspaceService,
    private activity: ActivityService,
    private users: ManualLoginService
  ) {}

  workspaceId!: string;
  boardId!: string;
  boardDetails: any;
  activityDetails: any;
  userId!: number;
  username!: string;
  boards: any[] = [];
  members: any[] = [];
  isActive: boolean = true;

  editHeadingForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-z A-Z0-9\.,]{3,50}$/),
    ]),
  });

  boardHeadingForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-z A-Z0-9\.,]{3,50}$/),
    ]),
  });

  editDescForm = new FormGroup({
    description: new FormControl('', [Validators.maxLength(150)]),
  });

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.workspaceId = params.get('workspaceId')!;
      this.boardId = params.get('boardId')!;
      this.getboardDetails(this.boardId, this.workspaceId);
      this.getWorkspaceMembers(this.workspaceId);

      this.users.getUsers().subscribe((response: any) => {
        this.userId = response.id;
        this.getActivities(this.boardId, this.userId, this.workspaceId);
      });
    });
  }

  getboardDetails(id: string, workspaceId: string) {
    this.board.viewById(id, workspaceId).subscribe((response: any) => {
      this.boardDetails = response;
    });
  }

  getActivities(id: string, userId: number, workspaceId: string) {
    this.activity
      .viewActivity(id, userId, workspaceId)
      .subscribe((response: any) => {
        this.activityDetails = response;
      });
  }

  getWorkspaceMembers(id: string) {
    this.workspace.viewById(id).subscribe((response: any) => {
      this.members = response.memberLists;
      this.username = response.user.username;
    });
  }

  deleteActivity(id: number, userId: number) {
    this.activity.isAuthorizedToDelete(id, userId).subscribe((result: any) => {
      if (result.status === 'yes') {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          confirmButtonText:
            'Delete! <i class="bi bi-hand-thumbs-up-fill"></i>',
          confirmButtonAriaLabel: 'Thumbs up, great!',
          cancelButtonColor: '#d33',
          cancelButtonText:
            'Cancel <i class="bi bi-hand-thumbs-down-fill"></i>',
          cancelButtonAriaLabel: 'Thumbs down',
        }).then((result) => {
          if (result.isConfirmed) {
            this.activity.deleteActivity(id).subscribe((response: any) => {
              this.getActivities(this.boardId, this.userId, this.workspaceId);
              if (response.status) {
                Swal.fire({
                  title: 'Your record has been deleted.',
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            });
          }
        });
      } else {
        Swal.fire({
          title: `${result.status}`,
          icon: 'error',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }

  markAsDone(id: number, active: boolean) {
    this.activity
      .markAsDone(id, active, this.userId)
      .subscribe((response: any) => {
        this.getActivities(this.boardId, this.userId, this.workspaceId);
      });
  }

  showEdit(id: any) {
    const editButton = document.getElementById('edit-' + id);
    editButton!.style.display = 'inline';
  }

  showDescEdit(id: any) {
    const editButton = document.getElementById('descEdit-' + id);
    editButton!.style.display = 'inline';
  }

  hideEdit(id: any) {
    const editButton = document.getElementById('edit-' + id);
    editButton!.style.display = 'none';
  }

  hideDescEdit(id: any) {
    const editButton = document.getElementById('descEdit-' + id);
    editButton!.style.display = 'none';
  }

  onHeadingEdit(id: any, value: string) {
    const heading = document.getElementById('h-' + id);
    const form = document.getElementById('form-' + id);
    const input = document.getElementById('input-' + id);

    heading!.style.display = 'none';
    form!.style.display = 'inline';

    this.editHeadingForm.patchValue({
      name: value,
    });

    input?.focus();
  }

  onDescEdit(id: any, value: string) {
    const description = document.getElementById('p-' + id);
    const form = document.getElementById('formDesc-' + id);
    const input = document.getElementById('inputDesc-' + id);

    description!.style.display = 'none';
    form!.style.display = 'inline';

    this.editDescForm.patchValue({
      description: value,
    });

    input?.focus();
  }

  onclickOutside(id: any) {
    const heading = document.getElementById('h-' + id);
    const description = document.getElementById('p-' + id);
    const input = document.getElementById('form-' + id);
    const inputDesc = document.getElementById('formDesc-' + id);

    heading!.style.display = 'block';
    description!.style.display = 'block';
    input!.style.display = 'none';
    inputDesc!.style.display = 'none';
  }

  editActivity(id: number) {
    if (!this.editHeadingForm.invalid) {
      const updatedFormValue = {
        ...this.editHeadingForm.value,
        id: id,
        lastModified: this.userId,
      };

      this.activity
        .editActivity(updatedFormValue)
        .subscribe((response: any) => {
          this.getActivities(this.boardId, this.userId, this.workspaceId);
        });
    }
  }

  editActivityDesc(id: number) {
    if (!this.editDescForm.invalid) {
      const updatedFormValue = {
        ...this.editDescForm.value,
        id: id,
        lastModified: this.userId,
      };

      this.activity
        .editActivity(updatedFormValue)
        .subscribe((response: any) => {
          this.getActivities(this.boardId, this.userId, this.workspaceId);
        });
    }
  }

  showBoardHeadingEdit(id: string, value: string) {
    if (this.userId === this.boardDetails.userId) {
      const heading = document.getElementById('boardHeading-' + id);
      const form = document.getElementById('boardform-' + id);
      const input = document.getElementById('boardinput-' + id);

      heading!.style.display = 'none';
      form!.style.display = 'inline';

      this.boardHeadingForm.patchValue({
        name: value,
      });

      input?.focus();
    }
  }

  editBoardHeading(id: string) {
    const heading = document.getElementById('boardHeading-' + id);
    const form = document.getElementById('boardform-' + id);

    if (!this.boardHeadingForm.invalid) {
      const updatedFormValue = {
        ...this.boardHeadingForm.value,
        id: id,
      };

      console.log(updatedFormValue);

      this.board.editBoard(updatedFormValue).subscribe((response: any) => {
        this.getboardDetails(this.boardId, this.workspaceId);

        heading!.style.display = 'block';
        form!.style.display = 'none';
      });
    }
  }
}
