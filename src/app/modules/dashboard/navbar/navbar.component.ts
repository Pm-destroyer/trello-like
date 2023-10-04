import { Component } from '@angular/core';

import { ProjectService } from '../../../services/project.service';
import { ManualLoginService } from '../../../services/manual-login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  title: string = 'Trello-like';
  project_admin!: number;
  userName!: string;
  projects: any[] = [];

  constructor(
    private project: ProjectService,
    private users: ManualLoginService
  ) {}

  ngOnInit() {
    this.getproject_admin();
  }

  getproject_admin() {
    this.users.getUsers().subscribe((response: any) => {
      this.project_admin = response.id;
      this.userName = response.username;

      this.getProject(response.id);
    });
  }

  getProject(project_admin: any) {
    this.projects = [];
    this.project.viewProject(project_admin).subscribe((response: any) => {
      this.projects = this.projects.concat(response);
    });
  }

  logout() {
    localStorage.removeItem('user');
  }
}
