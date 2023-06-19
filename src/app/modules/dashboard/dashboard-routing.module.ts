import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthGuard } from '../../guards/auth.guard';
import { WorkspaceItemComponent } from './workspace-item/workspace-item.component';
import { BoardItemComponent } from './board-item/board-item.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: NavbarComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'workspace',
    children: [
      {
        path: ':workspaceId',
        component: WorkspaceItemComponent,
        canActivate: [AuthGuard],
      },
      {
        path: ':workspaceId/board/:boardId',
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
