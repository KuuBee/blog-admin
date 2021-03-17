import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiBase, ApiType } from '.';

export namespace FriendLinkApiType {
  export enum FriendLinkStatus {
    // 启用
    ENABLE = 'enable',
    // 禁用
    DISABLE = 'disable',
    // 审核中
    UNDER_ERVIEW = 'under_review',
  }
  export namespace Parameter {
    export interface Index extends ApiType.PaginationParameter {}
    export interface UpdatePart {
      linkId: number;
      title?: string;
      subtitle?: string;
      link?: string;
      avatarLink?: string;
      status?: FriendLinkStatus;
      oldStatus?: FriendLinkStatus;
    }
  }
  export namespace Response {
    export type Index = ApiType.SuccessResponse<ApiType.PaginationResponse<IndexData>>;
    export type UpdatePart = ApiType.SuccessResponse;
    export interface IndexData {
      linkId: number;
      userId: number;
      title: string;
      subtitle: string;
      link: string;
      avatarLink: string;
      status: string;
      createdAt: string;
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class FriendLinkApiService extends ApiBase {
  constructor(private _http: HttpClient) {
    super('/friend-link');
  }
  index({ page, pageSize }: FriendLinkApiType.Parameter.Index = { page: 0, pageSize: 10 }) {
    return this._http.get<FriendLinkApiType.Response.Index>(this._baseUrl, {
      params: {
        page: page?.toString(),
        pageSize: pageSize?.toString(),
      },
    });
  }
  updatePart(body: FriendLinkApiType.Parameter.UpdatePart) {
    return this._http.patch<FriendLinkApiType.Response.UpdatePart>(this._baseUrl, body);
  }
}
