import { Component } from '@angular/core';

import { WorkspaceService } from '../../../services/workspace.service';
import { ManualLoginService } from '../../../services/manual-login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  title: string = 'Trello-like';
  userId!: number;
  userName!: string;
  workspaces: any[] = [];

  constructor(
    private workspace: WorkspaceService,
    private users: ManualLoginService
  ) {}

  ngOnInit() {
    this.getUserId();
  }

  getUserId() {
    this.users.getUsers().subscribe((response: any) => {
      this.userId = response.id;
      this.userName = response.username;

      this.getWorkspace(response.id);
    });
  }

  getWorkspace(userId: any) {
    this.workspaces = [];
    this.workspace.viewWorkspace(userId).subscribe((response: any) => {
      this.workspaces = this.workspaces.concat(response);
    });
  }

  logout() {
    localStorage.removeItem('user');
  }
}
