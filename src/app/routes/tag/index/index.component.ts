import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TagApiService, TagApiType } from '@core/api/tag-api.service';
import { Observable, Subscription } from 'rxjs';
import { CreateDialogComponent } from '../shared/component/create-dialog/create-dialog.component';

@Component({
  selector: 'app-tag-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class TagIndexComponent implements OnInit, OnDestroy {
  constructor(private _matDialog: MatDialog, private _tagApi: TagApiService) {}
  dataSource = new MatTableDataSource<TagApiType.Response.IndexData>();
  displayedColumns: string[] = ['tagId', 'content', 'count', 'createdAt', 'updatedAt', 'status'];
  closeDialog$: Subscription;
  length: number = 0;
  loading: boolean = false;

  ngOnInit() {
    this.requireTagIndex();
  }
  ngOnDestroy() {
    if (this.closeDialog$) this.closeDialog$.unsubscribe();
  }
  requireTagIndex(data: TagApiType.Parameter.Index = { page: '0', pageSize: '10' }) {
    this.loading = true;
    this._tagApi.index(data).subscribe(res => {
      console.log(res);
      this.dataSource.data = res.data.data;
      this.length = res.data.pagination.total;
      this.loading = false;
    });
  }
  createTag() {
    this.closeDialog$ = this._matDialog
      .open(CreateDialogComponent, {
        disableClose: true,
      })
      .afterClosed()
      .subscribe(() => {
        this.requireTagIndex();
      });
  }
  pageChange(e: PageEvent) {
    this.requireTagIndex({
      page: e.pageIndex,
      pageSize: e.pageSize,
    });
  }
}
