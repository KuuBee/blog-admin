import { HttpClient, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiBase, ApiType } from '.';

export namespace UserApiType {
  export enum UserEnum {
    enable,
    disable,
  }
  export namespace Parameter {
    export interface Index extends ApiType.PaginationParameter {}
  }
  export namespace Response {
    export type Index = ApiType.SuccessResponse<IndexData>;
    export type IndexData = ApiType.PaginationResponse<UserIndexData>;
    export interface UserIndexData {
      name: string;
      avatar: string;
      createdAt: string;
      updatedAt: string;
      status: UserEnum;
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class UserApiService extends ApiBase {
  constructor(private _http: HttpClient) {
    super('/user');
  }
  index(params: UserApiType.Parameter.Index = { page: '0', pageSize: '10' }) {
    return this._http.get<UserApiType.Response.Index>(this._baseUrl, {
      params: params as any,
    });
  }
  create() {
    // return this._http.post(this._baseUrl);
  }
}
