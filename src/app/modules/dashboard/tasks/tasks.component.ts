import { ChangeDetectorRef, Component } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent {
  componentWidth!: number;
  matginLeft!: number;

  userListAPI: string = `${environment.API_URL}/task/viewTaskByProjectId`;
  datatableColumns: any[] = [
    {
      title: 'Name',
      data: 'name',
    },
    {
      title: 'status',
      data: 'status',
    },
    {
      title: 'Priority',
      data: 'priority.name',
    },
    {
      title: 'Estimated Hours',
      data: 'estimated_hours',
    },
    {
      title: 'Actual Hours',
      data: 'actual_hours',
    },
    {
      title: 'Start date',
      data: 'start_date',
    },
    {
      title: 'End date',
      data: 'end_date',
    },
    {
      title: 'Created by',
      data: 'created_by',
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
