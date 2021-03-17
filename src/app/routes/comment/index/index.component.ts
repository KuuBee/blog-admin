import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { CommentApiService, CommentApiType } from '@core/api/comment-api.service';
import { of } from 'rxjs';
import { concatMap } from 'rxjs/operators';

interface CommentData extends Omit<CommentApiType.Response.IndexData, 'user' | 'article'> {
  userId: number;
  name: string;
  articleId: number;
  title: string;
}

@Component({
  selector: 'app-comment-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class CommentIndexComponent implements OnInit {
  constructor(private _commentApi: CommentApiService) {}
  loading = false;
  dataSource = new MatTableDataSource<CommentData>();
  displayedColumns: string[] = ['title', 'name', 'browser', 'os', 'createdAt', 'status', 'action'];
  length = 0;
  expandedElement: CommentData | null;

  ngOnInit() {
    this.requestCommentIndex();
  }
  requestCommentIndex(data?: CommentApiType.Parameter.Index) {
    this.loading = true;
    this._commentApi
      .index(data)
      .pipe(
        concatMap(val => {
          this.length = val.data.pagination.total;
          const newVal = val.data.data.map(item => {
            const _newItem = item as any;
            _newItem.userId = item.user.userId;
            _newItem.name = item.user.name;
            _newItem.articleId = item.article.articleId;
            _newItem.title = item.article.title;
            delete _newItem.user;
            delete _newItem.article;
            const newItem: CommentData = _newItem;
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
  updateCommentPart(data: CommentApiType.Parameter.UpdatePart) {
    this._commentApi.updatePart(data).subscribe(res => {
      console.log(res);
      this.requestCommentIndex();
    });
  }
  pageChange({ pageIndex, pageSize }: PageEvent) {
    this.requestCommentIndex({ pageSize, page: pageIndex });
  }
  approved(item: CommentData) {}
  slideChange({ checked }: MatSlideToggleChange, { commentId }: CommentData) {
    this.updateCommentPart({
      status: checked ? CommentApiType.CommentStatus.ENABLE : CommentApiType.CommentStatus.DISABLE,
      commentId,
    });
  }
}
