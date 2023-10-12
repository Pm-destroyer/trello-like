import { ChangeDetectorRef, Component } from '@angular/core';
import { ManualLoginService } from 'src/app/services/manual-login.service';
import { ProjectService } from 'src/app/services/project.service';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.scss'],
})
export class ProjectDashboardComponent {
  componentWidth!: number;
  matginLeft!: number;
  project_admin!: number;
  userName!: string;
  hasOtherProjects!: boolean;
  projects: any[] = [];
  members: any[] = [];
  userBgColors: string[] = [];

  constructor(
    private sidebarService: SidebarService,
    private cdr: ChangeDetectorRef,
    private project: ProjectService,
    private users: ManualLoginService
  ) {}

  ngOnInit() {
    this.getproject_admin();

    this.getUserList();

    this.sidebarService.sidebarWidth$.subscribe((width) => {
      this.componentWidth = this.sidebarService.calcWidth(width);
      this.matginLeft = width;

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

      this.hasOtherProjects =
        this.projects.filter((item) => item.project_admin !== project_admin)
          .length > 0;
    });
  }

  getUserList() {
    this.users.userListByLimit(5).subscribe((response: any) => {
      this.members = this.members.concat(response);

      this.userBgColor();
    });
  }

  userBgColor() {
    for (const key in this.members) {
      const randomColor = this.users.getRandomColor();
      if (randomColor !== null) {
        this.userBgColors.push(randomColor);
      }
    }
  }
}
