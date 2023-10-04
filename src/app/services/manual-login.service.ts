import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ManualLoginService {
  constructor(private http: HttpClient) {}

  rootURL = 'http://localhost:8000/user';

  getUsers(): Observable<any> {
    return this.http.post(this.rootURL + '/getUserByToken', {
      token: localStorage.getItem('user'),
    });
  }

  addUser(user: any) {
    return this.http.post(this.rootURL + '/create', user);
  }

  loginUser(user: any) {
    return this.http.post(this.rootURL + '/login', user);
  }

  getUserList(id: number, projectId: string) {
    return this.http.post(this.rootURL + '/view', {
      id: id,
      projectId: projectId,
    });
  }

  userDropByWorkspace(id: number, projectId: string) {
    return this.http.post(this.rootURL + '/userDropByWorkspace', {
      id: id,
      projectId: projectId,
    });
  }
}
