import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import * as $ from 'jquery';

import { TaskService } from '../../../services/task.service';
import { ManualLoginService } from '../../../services/manual-login.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-manage-visibility',
  templateUrl: './manage-visibility.component.html',
  styleUrls: ['./manage-visibility.component.scss'],
})
export class ManageVisibilityComponent {
  @ViewChild('modalclose') modalclose: any;
  @Output() getTask: EventEmitter<any> = new EventEmitter();
  @Input() taskId!: number;
  @Input() activityId!: number;
  @Input() addedMembers!: any;
  @Input() taskDetails!: any[];

  constructor(
    private task: TaskService,
    private users: ManualLoginService,
    private route: ActivatedRoute
  ) {}

  userId!: number;
  id!: number;
  display: boolean = false;
  workspaceId!: string;
  membersDrop: any[] = [];

  manageVisibilityForm = new FormGroup({
    visibleTo: new FormControl(
      [],
      [
        Validators.required,
        (control: AbstractControl) => {
          const selectedOptions = control.value;
          return selectedOptions && selectedOptions.length > 0
            ? null
            : { invalidSelection: true };
        },
      ]
    ),
  });

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.workspaceId = params.get('workspaceId')!;

      this.getUserId();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['workspaceId'] && !changes['workspaceId'].firstChange) {
      this.fetchUserList();
    }

    this.id = this.taskId;

    this.manageVisibilityForm.patchValue({
      visibleTo:
        this.addedMembers !== null &&
        this.addedMembers !== '' &&
        this.addedMembers !== undefined
          ? this.addedMembers.split(',').map((item: string) => +item)
          : [],
    });
  }

  getUserId() {
    this.users.getUsers().subscribe((response: any) => {
      this.userId = response.id;

      this.fetchUserList();
    });
  }

  fetchUserList() {
    if (this.userId && this.workspaceId) {
      this.users
        .userDropByWorkspace(this.userId, this.workspaceId)
        .subscribe((response: any) => {
          this.membersDrop = response;
        });
    }
  }

  onSubmit() {
    if (!this.manageVisibilityForm.invalid) {
      this.display = false;

      const updatedFormValue = {
        ...this.manageVisibilityForm.value,
        id: this.id,
        userId: this.userId,
      };

      this.task
        .manageVisibility(updatedFormValue)
        .subscribe((response: any) => {
          this.manageVisibilityForm.reset();

          this.getTask.emit(this.activityId);

          this.fetchUserList();

          this.modalclose.nativeElement.click();
        });
    } else {
      this.display = true;
    }
  }

  onCancel() {
    this.manageVisibilityForm.reset();
    this.getTask.emit(this.activityId);

    this.fetchUserList();

    this.manageVisibilityForm.patchValue({
      visibleTo:
        this.addedMembers !== null &&
        this.addedMembers !== '' &&
        this.addedMembers !== undefined
          ? this.addedMembers.split(',').map((item: string) => +item)
          : [],
    });
  }
}
