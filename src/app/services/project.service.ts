import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  rootURL = `${environment.API_URL}/project`;

  addProject(project: any) {
    return this.http.post(this.rootURL + '/create', project);
  }

  viewProject(project_admin: number) {
    return this.http.post(this.rootURL + '/viewProject', {
      project_admin: project_admin,
    });
  }

  projectTypeDropdown() {
    return this.http.get(this.rootURL + '/projectTypeDrop');
  }

  viewById(id: string) {
    return this.http.post(this.rootURL + '/viewById', { id: id });
  }

  addMembers(members: any) {
    return this.http.post(this.rootURL + '/addMembers', members);
  }

  removeMember(members: any) {
    return this.http.post(this.rootURL + '/removeMember', members);
  }

  editProject(data: any) {
    return this.http.post(this.rootURL + '/editProject', data);
  }
}
