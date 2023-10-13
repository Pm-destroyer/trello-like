import { ChangeDetectorRef, Component } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersComponent {
  componentWidth!: number;
  matginLeft!: number;

  userListAPI: string = `${environment.API_URL}/user/userList`;
  datatableColumns: any[] = [
    {
      title: 'First name',
      data: 'first_name',
    },
    {
      title: 'Last name',
      data: 'last_name',
    },
    {
      title: 'User name',
      data: 'username',
    },
    {
      title: 'Role',
      data: 'roleId',
    },
  ];

  constructor(
    private sidebarService: SidebarService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.sidebarService.sidebarWidth$.subscribe((width) => {
      this.componentWidth = this.sidebarService.calcWidth(width);
      this.matginLeft = width;

      this.cdr.detectChanges();
    });
  }
}
