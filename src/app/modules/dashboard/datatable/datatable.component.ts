import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss'],
})
export class DatatableComponent {
  dtOptions: DataTables.Settings = {};

  @Input() API!: string;
  @Input() request!: any;
  @Input() columns!: any[];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.dtOptions = {
      serverSide: true, // Set the flag
      ajax: (dataTablesParameters: any, callback) => {
        this.http
          .post(
            this.API,
            this.request
              ? { ...dataTablesParameters, ...this.request }
              : dataTablesParameters,
            {}
          )
          .subscribe((resp: any) => {
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: resp.data,
            });
          });
      },
      columns: this.columns,
    };
  }
}
