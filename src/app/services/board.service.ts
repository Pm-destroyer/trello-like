import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private http: HttpClient) {}

  rootURL = `${environment.API_URL}/board`;

  addBoard(board: any) {
    return this.http.post(this.rootURL + '/create', board);
  }

  viewBoard(userId: number, projectId: string) {
    return this.http.post(this.rootURL + '/viewBoard', {
      userId: userId,
      projectId: projectId,
    });
  }

  viewById(id: string, projectId: string) {
    return this.http.post(this.rootURL + '/viewById', {
      id: id,
      projectId: projectId,
    });
  }

  editBoard(data: any) {
    return this.http.post(this.rootURL + '/editBoard', data);
  }
}
