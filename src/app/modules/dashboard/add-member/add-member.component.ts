import {
  Component,
  Output,
  ViewChild,
  EventEmitter,
  Input,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';

import { ProjectService } from '../../../services/project.service';
import { ManualLoginService } from '../../../services/manual-login.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss'],
})
export class AddMemberComponent {
  @ViewChild('modalclose') modalclose: any;
  @Input() projectId!: string;
  @Input() addedMembers!: any;
  @Input() members!: any[];
  @Output() getWorkspaceDetails: EventEmitter<any> = new EventEmitter();
  @Output() fetchUserList: EventEmitter<any> = new EventEmitter();

  constructor(
    private project: ProjectService,
    private users: ManualLoginService
  ) {}

  display: boolean = false;
  userId!: number;

  addMemberForm = new FormGroup({
    members: new FormControl(
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
    this.getUserId();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['projectId'] && !changes['projectId'].firstChange) {
      this.fetchUserList.emit();
    }
  }

  getUserId() {
    this.users.getUsers().subscribe((response: any) => {
      this.userId = response.id;

      this.fetchUserList.emit();
    });
  }

  onMaterialGroupChange(event: any) {
    console.log(event);
  }

  onSubmit() {
    if (!this.addMemberForm.invalid) {
      this.display = false;

      const updatedFormValue = {
        ...this.addMemberForm.value,
        userId: this.userId,
        addedMembers: this.addedMembers,
        projectId: this.projectId,
      };

      this.project.addMembers(updatedFormValue).subscribe((response: any) => {
        this.addMemberForm.reset();

        this.getWorkspaceDetails.emit(this.userId);

        this.fetchUserList.emit();

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
    this.addMemberForm.reset();
  }
}
