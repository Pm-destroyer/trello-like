import {
  Component,
  Output,
  ViewChild,
  EventEmitter,
  Input,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { BoardService } from '../../../services/board.service';
import { ManualLoginService } from '../../../services/manual-login.service';

@Component({
  selector: 'app-add-board',
  templateUrl: './add-board.component.html',
  styleUrls: ['./add-board.component.scss'],
})
export class AddBoardComponent {
  @ViewChild('modalclose') modalclose: any;
  @Output() getboard: EventEmitter<any> = new EventEmitter();
  @Input() projectId!: string;

  constructor(private board: BoardService, private users: ManualLoginService) {}

  display: boolean = false;
  userId!: number;

  addBoardForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-z A-Z0-9\.,]{3,50}$/),
    ]),
    description: new FormControl('', [Validators.maxLength(150)]),
  });

  ngOnInit() {
    this.getUserId();
  }

  getUserId() {
    this.users.getUsers().subscribe((response: any) => {
      this.userId = response.id;
    });
  }

  onSubmit() {
    if (!this.addBoardForm.invalid) {
      this.display = false;

      const updatedFormValue = {
        ...this.addBoardForm.value,
        projectId: this.projectId,
        userId: this.userId,
      };

      this.board.addBoard(updatedFormValue).subscribe((response: any) => {
        this.addBoardForm.reset();

        this.getboard.emit(this.userId);

        this.modalclose.nativeElement.click();

        Swal.fire({
          title: `Your board has been added succesfully`,
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
    this.addBoardForm.reset();
    this.addBoardForm.patchValue({
      name: '',
      description: '',
    });
  }
}
