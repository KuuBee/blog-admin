import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  ClassificationApiService,
  ClassificationApiType,
} from '@core/api/classification-api.service';
import { Subscription } from 'rxjs';
import { CreateDialogComponent } from '../shared/component/create-dialog/create-dialog.component';

@Component({
  selector: 'app-classification-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class ClassificationIndexComponent implements OnInit, OnDestroy {
  constructor(
    private _classificationApi: ClassificationApiService,
    private _matDialog: MatDialog
  ) {}
  loading: boolean = false;
  length: number = 0;
  dataSource = new MatTableDataSource<ClassificationApiType.Response.IndexData>();
  displayedColumns: string[] = [
    'classificationId',
    'content',
    'count',
    'createdAt',
    'updatedAt',
    'status',
  ];
  dialogClose$: Subscription;

  ngOnInit() {
    this.requireClassificationIndex();
  }
  ngOnDestroy() {
    if (this.dialogClose$) this.dialogClose$.unsubscribe();
  }
  requireClassificationIndex(
    data: ClassificationApiType.Parameter.Index = { page: 0, pageSize: 10 }
  ) {
    this._classificationApi.index(data).subscribe(res => {
      this.dataSource.data = res.data.data;
      this.length = res.data.pagination.total;
    });
  }
  createClassification() {
    this.dialogClose$ = this._matDialog
      .open(CreateDialogComponent, {
        disableClose: true,
      })
      .afterClosed()
      .subscribe(() => {
        this.requireClassificationIndex();
      });
  }
  pageChange(e: PageEvent) {
    this.requireClassificationIndex({
      page: e.pageIndex,
      pageSize: e.pageSize,
    });
  }
}
