import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserApiService, UserApiType } from '@core/api/user-api.service';

@Component({
  selector: 'app-user-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class UserIndexComponent implements OnInit, AfterViewInit {
  constructor(private _userApi: UserApiService) {}
  displayedColumns: string[] = ['name', 'avatar', 'createdAt', 'updatedAt', 'status'];
  dataSource = new MatTableDataSource<UserApiType.Response.UserIndexData>();
  length: number = 0;
  pageIndex = 0;
  pageSize = 10;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {}
  ngAfterViewInit() {
    this.requireUserIndex();
  }
  requireUserIndex() {
    this._userApi
      .index({
        page: this.pageIndex,
        pageSize: this.pageSize,
      })
      .subscribe(res => {
        console.log(res);
        this.dataSource.data = res.data.data;
        if (!this.length) {
          this.length = res.data.pagination.total;
        }
      });
  }
  pageChange(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.requireUserIndex();
  }
}
