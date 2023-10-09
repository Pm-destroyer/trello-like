import { ChangeDetectorRef, Component } from '@angular/core';

import { ProjectService } from '../../../services/project.service';
import { ManualLoginService } from '../../../services/manual-login.service';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  project_admin!: number;
  userName!: string;
  projects: any[] = [];
  sidebarWidth!: number;

  constructor(
    private project: ProjectService,
    private users: ManualLoginService,
    private sidebarService: SidebarService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getproject_admin();

    this.sidebarService.sidebarWidth$.subscribe((width) => {
      this.sidebarWidth = width;

      console.log(this.sidebarWidth);

      this.cdr.detectChanges();
    });
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
}
