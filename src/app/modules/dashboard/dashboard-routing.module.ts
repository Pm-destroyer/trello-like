import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MembersComponent } from './members/members.component';
import { AuthGuard } from '../../guards/auth.guard';
import { ProjectItemComponent } from './project-item/project-item.component';
import { BoardItemComponent } from './board-item/board-item.component';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'members',
    component: MembersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'tasks',
    canActivate: [AuthGuard],
    children: [
      {
        path: ':projectId',
        component: TasksComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'project-dashboard',
    canActivate: [AuthGuard],
    children: [
      {
        path: ':projectId',
        component: ProjectDashboardComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'project',
    children: [
      {
        path: ':projectId',
        component: ProjectItemComponent,
        canActivate: [AuthGuard],
      },
      {
        path: ':projectId/board/:boardId',
        component: BoardItemComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
