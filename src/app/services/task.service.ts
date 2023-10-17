import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  rootURL = `${environment.API_URL}/task`;

  private taskId!: number;

  addTask(task: any) {
    return this.http.post(this.rootURL + '/create', task);
  }

  viewTaskByLimit(project_id: string, limit: number) {
    return this.http.post(this.rootURL + '/viewTaskByLimit', {
      project_id: project_id,
      limit: limit,
    });
  }

  editTask(task: any) {
    return this.http.post(this.rootURL + '/editTask', task);
  }

  deleteTask(id: number) {
    return this.http.post(this.rootURL + '/deleteTask', id);
  }

  markAsDone(status: any) {
    return this.http.post(this.rootURL + '/markAsDone', status);
  }

  manageVisibility(data: any) {
    return this.http.post(this.rootURL + '/manageVisibility', data);
  }

  addedMembers(taskId: number) {
    return this.http.post(this.rootURL + '/addedMembers', { id: taskId });
  }

  addTaskPriority(data: any) {
    return this.http.post(this.rootURL + '/addTaskPriority', data);
  }

  priorityList() {
    return this.http.get(this.rootURL + '/priorityList');
  }

  getTaskId() {
    return this.taskId;
  }

  setTaskId(taskId: number) {
    this.taskId = taskId;
  }
}
