import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ManualLoginService {
  constructor(private http: HttpClient) {}

  rootURL = 'http://localhost:8000/user';
  colorArr = [
    '#618264',
    '#186F65',
    '#132043',
    '#363062',
    '#940B92',
    '#005B41',
    '#008170',
    '#363062',
    '#CD5C08',
    '#445D48',
  ];

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

  getAlluser(limit: number) {
    return this.http.post(this.rootURL + '/userList', { limit: limit });
  }

  userDropByWorkspace(id: number, projectId: string) {
    return this.http.post(this.rootURL + '/userDropByWorkspace', {
      id: id,
      projectId: projectId,
    });
  }

  getRandomColor() {
    if (this.colorArr.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * this.colorArr.length);

    return this.colorArr[randomIndex];
  }
}
