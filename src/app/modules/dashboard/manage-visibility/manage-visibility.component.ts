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
  @Output() getTaskDetails: EventEmitter<any> = new EventEmitter();
  @Input() taskId!: number;
  @Input() userId!: number;
  @Input() activityId!: number;
  @Input() addedMembers!: any;
  @Input() membersDrop!: any[];

  constructor(
    private task: TaskService,
    private users: ManualLoginService,
    private route: ActivatedRoute
  ) {}

  id!: number;
  display: boolean = false;
  workspaceId!: string;

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
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['taskId'] && !changes['taskId'].firstChange) {
      const updatedTaskId = changes['taskId'].currentValue;
      this.id = updatedTaskId;
    }

    console.log(this.id);

    this.manageVisibilityForm.patchValue({
      visibleTo:
        this.addedMembers !== null &&
        this.addedMembers !== '' &&
        this.addedMembers !== undefined
          ? this.addedMembers.split(',').map((item: string) => +item)
          : [],
    });
  }

  onSubmit() {
    console.log(this.id);

    this.display = false;

    const updatedFormValue = {
      ...this.manageVisibilityForm.value,
      id: this.id,
      userId: this.userId,
    };

    this.task.manageVisibility(updatedFormValue).subscribe((response: any) => {
      this.manageVisibilityForm.reset();

      this.getTaskDetails.emit();

      this.modalclose.nativeElement.click();
    });
  }

  onCancel() {
    this.manageVisibilityForm.reset();
    this.getTaskDetails.emit();

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
