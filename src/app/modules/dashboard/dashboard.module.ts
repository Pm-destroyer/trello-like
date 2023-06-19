import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { AddWorkspaceComponent } from './add-workspace/add-workspace.component';
import { WorkspaceItemComponent } from './workspace-item/workspace-item.component';
import { AddBoardComponent } from './add-board/add-board.component';
import { AddMemberComponent } from './add-member/add-member.component';
import { BoardItemComponent } from './board-item/board-item.component';
import { AddActivityComponent } from './add-activity/add-activity.component';

import { ClickOutsideDirective } from '../../directives/click-outside.directive';

@NgModule({
  declarations: [
    NavbarComponent,
    AddWorkspaceComponent,
    WorkspaceItemComponent,
    AddBoardComponent,
    AddMemberComponent,
    BoardItemComponent,
    AddActivityComponent,
    ClickOutsideDirective,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
  ],
})
export class DashboardModule {}
