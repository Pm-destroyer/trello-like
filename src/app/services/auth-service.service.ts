import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { WorkspaceService } from './workspace.service';
import { ManualLoginService } from './manual-login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(
    private users: ManualLoginService,
    private workspace: WorkspaceService
  ) {}

  userId!: number;

  isAuthorized(id: any): Observable<boolean> {
    let userList: any[] = [];

    return new Observable<boolean>((observer) => {
      this.workspace.viewById(id).subscribe((response: any) => {
        console.log(response);
        if (response !== null) {
          if (response.members !== null) {
            userList = response.members
              .split(',')
              .map((item: string) => parseInt(item));
          }
          userList.push(response.userId);

          this.users.getUsers().subscribe((userRes: any) => {
            this.userId = userRes.id;

            observer.next(userList.includes(this.userId));
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
