import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { ProjectItemComponent } from './project-item/project-item.component';
import { AddBoardComponent } from './add-board/add-board.component';
import { AddMemberComponent } from './add-member/add-member.component';
import { BoardItemComponent } from './board-item/board-item.component';
import { AddActivityComponent } from './add-activity/add-activity.component';

import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { ActivityItemComponent } from './activity-item/activity-item.component';
import { TaskItemComponent } from './task-item/task-item.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { ManageVisibilityComponent } from './manage-visibility/manage-visibility.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AddPriorityComponent } from './add-priority/add-priority.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { MembersComponent } from './members/members.component';

@NgModule({
  declarations: [
    NavbarComponent,
    AddProjectComponent,
    ProjectItemComponent,
    AddBoardComponent,
    AddMemberComponent,
    BoardItemComponent,
    AddActivityComponent,
    ClickOutsideDirective,
    ActivityItemComponent,
    TaskItemComponent,
    AddTaskComponent,
    ManageVisibilityComponent,
    UserProfileComponent,
    AddPriorityComponent,
    SidebarComponent,
    ProjectDashboardComponent,
    MembersComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
  ],
})
export class DashboardModule {}
