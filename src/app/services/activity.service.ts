import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  constructor(private http: HttpClient) {}

  rootURL = 'http://localhost:8000/activity';

  addActivity(activity: any) {
    return this.http.post(this.rootURL + '/create', activity);
  }

  viewActivity(boardId: string, project_admin: number, projectId: string) {
    return this.http.post(this.rootURL + '/viewActivity', {
      project_admin: project_admin,
      boardId: boardId,
      projectId: projectId,
    });
  }

  viewById(id: number) {
    return this.http.post(this.rootURL + '/viewById', { id: id });
  }

  markAsDone(id: number, active: boolean, lastModified: number) {
    return this.http.post(this.rootURL + '/markAsDone', {
      active: active,
      id: id,
      lastModified: lastModified,
    });
  }

  isAuthorizedToDelete(id: number, userId: number) {
    return this.http.post(this.rootURL + '/isAuthorizedToDelete', {
      id: id,
      userId: userId,
    });
  }

  deleteActivity(id: number) {
    return this.http.post(this.rootURL + '/deleteActivity', {
      id: id,
    });
  }

  editActivity(data: any) {
    return this.http.post(this.rootURL + '/editActivity', data);
  }
}
