import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiBase, ApiType } from '.';
export namespace ReplyApiType {
  export enum ReplyStatus {
    ENABLE = 'enable',
    DISABLE = 'disable',
    UNDER_ERVIEW = 'under_review',
  }
  export namespace Parameter {
    export interface Index extends ApiType.PaginationParameter {}
    export interface UpdatePart {
      id: number;
      status: ReplyStatus;
    }
  }
  export namespace Response {
    export type Index = ApiType.SuccessResponse<ApiType.PaginationResponse<IndexData>>;
    export type UpdatePart = ApiType.SuccessResponse;

    export interface IndexData {
      id: number;
      commentId: number;
      content: string;
      os: string;
      browser: string;
      createdAt: string;
      status: ReplyStatus;
      user: User;
    }
    export interface User {
      userId: number;
      name: string;
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class ReplyApiService extends ApiBase {
  constructor(private _http: HttpClient) {
    super('/reply');
  }
  index(parameter: ReplyApiType.Parameter.Index = { page: 0, pageSize: 10 }) {
    return this._http.get<ReplyApiType.Response.Index>(this._baseUrl, {
      params: parameter as any,
    });
  }
  updatePart(body: ReplyApiType.Parameter.UpdatePart) {
    return this._http.patch<ReplyApiType.Response.UpdatePart>(this._baseUrl, body);
  }
}
