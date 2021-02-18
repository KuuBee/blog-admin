import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiType } from '@core/api';
import { ArticleApiService, ArticleApiType } from '@core/api/article-api.service';
import { SearchListService } from '@shared/services/search-list.service';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-article-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class ArticleIndexComponent implements OnInit {
  constructor(
    private _searchList: SearchListService,
    private _articleApi: ArticleApiService,
    private _clipboard: Clipboard
  ) {}
  displayedColumns: string[] = [
    'articleId',
    'title',
    'articleLink',
    'classification',
    'tag',
    'likeCount',
    'createdAt',
    'updatedAt',
    'status',
    'action',
  ];
  dataSource = new MatTableDataSource<ArticleApiType.Response.IndexData>();
  length = 0;

  ngOnInit() {
    this.requireArticleIndex();
  }
  requireArticleIndex(
    data: ApiType.PaginationParameter = {
      page: 0,
      pageSize: 10,
    }
  ) {
    this._articleApi.index(data).subscribe(res => {
      console.log(res);
      this.dataSource.data = res.data.data;
      this.length = res.data.pagination.total;
    });
  }
  pageChange(e: PageEvent) {
    this.requireArticleIndex({
      pageSize: e.pageSize,
      page: e.pageIndex,
    });
  }
  copyLink(link: string) {
    const pending = this._clipboard.beginCopy(link);
    let remainingAttempts = 3;
    const attempt = () => {
      const result = pending.copy();
      if (!result && --remainingAttempts) {
        setTimeout(attempt);
      } else {
        // Remember to destroy when you're done!
        pending.destroy();
      }
    };
    attempt();
  }
}
