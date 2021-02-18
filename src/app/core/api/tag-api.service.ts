import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiBase, ApiType } from '.';

export namespace TagApiType {
  export namespace Parameter {
    export interface Create {
      name: string;
      status: TagStatus;
    }
    export interface Index extends ApiType.PaginationParameter {}
  }
  export namespace Response {
    export type Create = ApiType.SuccessResponse;
    export type Index = ApiType.SuccessResponse<ApiType.PaginationResponse<IndexData>>;
    export interface IndexData {
      tagId: number;
      content: string;
      count: number;
      createdAt: string;
      updatedAt: string;
      status: TagStatus;
    }
  }
}
export enum TagStatus {
  ENABLE = 'enable',
  DISABLE = 'disable',
}

@Injectable({
  providedIn: 'root',
})
export class TagApiService extends ApiBase {
  constructor(private _http: HttpClient) {
    super('/tag');
  }
  index(data: TagApiType.Parameter.Index) {
    return this._http.get<TagApiType.Response.Index>(this._baseUrl, {
      params: data as any,
    });
  }

  create(data: TagApiType.Parameter.Create) {
    return this._http.post<TagApiType.Response.Create>(this._baseUrl, data);
  }
}
