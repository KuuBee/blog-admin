import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiBase, ApiType } from '.';

export namespace ClassificationApiType {
  export namespace Parameter {
    export interface Create {
      name: string;
      status: ClassificationStatus;
    }
    export interface Index extends ApiType.PaginationParameter {}
  }
  export namespace Response {
    export type Create = ApiType.SuccessResponse;
    export type Index = ApiType.SuccessResponse<ApiType.PaginationResponse<IndexData>>;
    export interface IndexData {
      classificationId: number;
      content: string;
      status: ClassificationStatus;
      count: number;
      createdAt: string;
      updatedAt: string;
    }
  }
}

export enum ClassificationStatus {
  ENABLE = 'enable',
  DISABLE = 'disable',
}

@Injectable({
  providedIn: 'root',
})
export class ClassificationApiService extends ApiBase {
  constructor(private _http: HttpClient) {
    super('/classification');
  }
  index(data: ClassificationApiType.Parameter.Index) {
    return this._http.get<ClassificationApiType.Response.Index>(this._baseUrl, {
      params: data as any,
    });
  }
  create(body: ClassificationApiType.Parameter.Create) {
    return this._http.post<ClassificationApiType.Response.Create>(this._baseUrl, body);
  }
}
