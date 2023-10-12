import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss'],
})
export class DatatableComponent {
  dtOptions: DataTables.Settings = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.dtOptions = {
      serverSide: true, // Set the flag
      ajax: (dataTablesParameters: any, callback) => {
        this.http
          .post('http://localhost:8000/user/userList', dataTablesParameters, {})
          .subscribe((resp: any) => {
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: resp.data,
            });
          });
      },
      columns: [
        {
          title: 'First name',
          data: 'first_name',
        },
        {
          title: 'Last name',
          data: 'last_name',
        },
        {
          title: 'User name',
          data: 'username',
        },
      ],
    };
  }
}
