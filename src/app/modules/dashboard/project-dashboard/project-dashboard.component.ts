import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { ProjectService } from 'src/app/services/project.service';
import { SidebarService } from 'src/app/services/sidebar.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.scss'],
})
export class ProjectDashboardComponent {
  componentWidth!: number;
  matginLeft!: number;
  projectId!: string;
  projectDetails!: any;
  taskDetails: any[] = [];

  constructor(
    private sidebarService: SidebarService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private project: ProjectService,
    private task: TaskService
  ) {}

  ngOnInit() {
    this.sidebarService.sidebarWidth$.subscribe((width) => {
      this.componentWidth = this.sidebarService.calcWidth(width);
      this.matginLeft = width;

      this.cdr.detectChanges();
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.projectId = params.get('projectId')!;

      this.getProjectById(this.projectId);

      this.getTaskByProject(5);
    });
  }

  getProjectById(id: string) {
    this.project.viewById(id).subscribe((response: any) => {
      this.projectDetails = response;
    });
  }

  getTaskByProject(limit: number) {
    this.task
      .viewTaskByLimit(this.projectId, limit)
      .subscribe((response: any) => {
        this.taskDetails = response;
      });
  }
}
