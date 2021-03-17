import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { ReplyApiService, ReplyApiType } from '@core/api/reply-api.service';
import { of } from 'rxjs';
import { concatMap } from 'rxjs/operators';

interface ReplyData extends Omit<ReplyApiType.Response.IndexData, 'user'> {
  userId: number;
  name: string;
}

@Component({
  selector: 'app-reply-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class ReplyIndexComponent implements OnInit {
  constructor(private _replyApi: ReplyApiService) {}
  loading = false;
  dataSource = new MatTableDataSource<ReplyData>();
  displayedColumns: string[] = ['name', 'browser', 'os', 'createdAt', 'status', 'action'];
  length = 0;
  expandedElement: ReplyData | null;

  ngOnInit() {
    this.requestCommentIndex();
  }
  requestCommentIndex(data?: ReplyApiType.Parameter.Index) {
    this.loading = true;
    this._replyApi
      .index(data)
      .pipe(
        concatMap(val => {
          this.length = val.data.pagination.total;
          const newVal = val.data.data.map(item => {
            const _newItem = item as any;
            _newItem.userId = item.user.userId;
            _newItem.name = item.user.name;
            delete _newItem.user;
            delete _newItem.article;
            const newItem: ReplyData = _newItem;
            return newItem;
          });
          return of(newVal);
        })
      )
      .subscribe(res => {
        console.log(res);
        this.dataSource.data = res;
        this.loading = false;
      });
  }
  updateCommentPart(data: ReplyApiType.Parameter.UpdatePart) {
    this._replyApi.updatePart(data).subscribe(res => {
      console.log(res);
      this.requestCommentIndex();
    });
  }
  pageChange({ pageIndex, pageSize }: PageEvent) {
    this.requestCommentIndex({ pageSize, page: pageIndex });
  }
  approved(item: ReplyData) {}
  slideChange({ checked }: MatSlideToggleChange, { id }: ReplyData) {
    this.updateCommentPart({
      status: checked ? ReplyApiType.ReplyStatus.ENABLE : ReplyApiType.ReplyStatus.DISABLE,
      id,
    });
  }
}
