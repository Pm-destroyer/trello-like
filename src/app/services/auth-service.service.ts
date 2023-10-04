import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ProjectService } from './project.service';
import { ManualLoginService } from './manual-login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(
    private users: ManualLoginService,
    private project: ProjectService
  ) {}

  project_admin!: number;

  isAuthorized(id: any): Observable<boolean> {
    let userList: any[] = [];

    return new Observable<boolean>((observer) => {
      this.project.viewById(id).subscribe((response: any) => {
        if (response !== null) {
          // if (response.members !== null) {
          //   userList = response.members
          //     .split(',')
          //     .map((item: string) => parseInt(item));
          // }
          userList.push(response.project_admin);

          this.users.getUsers().subscribe((userRes: any) => {
            this.project_admin = userRes.id;

            observer.next(userList.includes(this.project_admin));
            observer.complete();
          });
        } else {
          observer.next(false);
          observer.complete();
        }
      });
    });
  }
}
