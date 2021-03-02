import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { FriendLinkApiService, FriendLinkApiType } from '@core/api/friend-link-api.service';

@Component({
  selector: 'app-friend-link-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class FriendLinkIndexComponent implements OnInit {
  constructor(private _friendLinkApi: FriendLinkApiService) {}

  loading = false;
  dataSource = new MatTableDataSource<FriendLinkApiType.Response.IndexData>();
  displayedColumns: string[] = [
    'linkId',
    'userId',
    'title',
    'subtitle',
    'link',
    'avatarLink',
    'createdAt',
    'status',
    'action',
  ];
  length = 0;

  ngOnInit() {
    this.requestFriendLinkIndex();
  }
  requestFriendLinkIndex(pagination?: FriendLinkApiType.Parameter.Index) {
    this.loading = true;
    this._friendLinkApi.index(pagination).subscribe({
      next: res => {
        console.log(res);
        this.dataSource.data = res.data.data;
        this.length = res.data.pagination.total;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
  pageChange(e: PageEvent) {
    this.requestFriendLinkIndex({
      pageSize: e.pageSize,
      page: e.pageIndex,
    });
  }
  approved({ linkId }: FriendLinkApiType.Response.IndexData) {
    this._friendLinkApi
      .updatePart({
        linkId,
        status: FriendLinkApiType.FriendLinkStatus.ENABLE,
      })
      .subscribe({
        complete: () => {
          this.requestFriendLinkIndex();
        },
      });
  }
  slideChange({ checked }: MatSlideToggleChange, { linkId }: FriendLinkApiType.Response.IndexData) {
    this._friendLinkApi
      .updatePart({
        linkId,
        status: checked
          ? FriendLinkApiType.FriendLinkStatus.ENABLE
          : FriendLinkApiType.FriendLinkStatus.DISABLE,
      })
      .subscribe({
        complete: () => {
          this.requestFriendLinkIndex();
        },
      });
  }
}
