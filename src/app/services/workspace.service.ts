import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  constructor(private http: HttpClient) {}

  rootURL = 'http://localhost:8000/workspace';

  addWorkspace(workspace: any) {
    return this.http.post(this.rootURL + '/create', workspace);
  }

  viewWorkspace(userId: number) {
    return this.http.post(this.rootURL + '/viewWorkspace', { userId: userId });
  }

  workspaceTypeDropdown() {
    return this.http.get(this.rootURL + '/workspaceTypeDrop');
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

  editWorkspace(data: any) {
    return this.http.post(this.rootURL + '/editWorkspace', data);
  }
}
