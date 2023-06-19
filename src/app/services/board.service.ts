import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private http: HttpClient) {}

  rootURL = 'http://localhost:8000/board';

  addBoard(board: any) {
    return this.http.post(this.rootURL + '/create', board);
  }

  viewBoard(userId: number, workspaceId: string) {
    return this.http.post(this.rootURL + '/viewBoard', {
      userId: userId,
      workspaceId: workspaceId,
    });
  }

  viewById(id: string, workspaceId: string) {
    return this.http.post(this.rootURL + '/viewById', {
      id: id,
      workspaceId: workspaceId,
    });
  }

  editBoard(data: any) {
    return this.http.post(this.rootURL + '/editBoard', data);
  }
}
