import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { MembersComponent } from './members/members.component';
import { AuthGuard } from '../../guards/auth.guard';
import { ProjectItemComponent } from './project-item/project-item.component';
import { BoardItemComponent } from './board-item/board-item.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: ProjectDashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'members',
    component: MembersComponent,
    canActivate: [AuthGuard],
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
