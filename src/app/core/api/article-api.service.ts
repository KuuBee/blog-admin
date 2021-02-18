import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchListService } from '@shared/services/search-list.service';
import { UtilsService } from '@shared/services/utils.service';
import { interval, of, combineLatest } from 'rxjs';
import { combineAll, concatMap, mapTo, take } from 'rxjs/operators';
import { ApiBase, ApiType } from '.';
import { SearchApiType } from './search-api.service';

export namespace ArticleApiType {
  export enum ArticleStatus {
    ENABLE = 'enable',
    DISABLE = 'disable',
  }
  export namespace Parameter {
    export type Index = ApiType.PaginationParameter;
    export interface Create {
      title: string;
      classificationId: number[];
      tagId: number[];
      file: File;
    }
    export interface Updata {
      title: string;
      classificationId: number[];
      tagId: number[];
      file: File;
      id: number;
    }
  }
  export namespace Response {
    export type Create = ApiType.SuccessResponse;
    export type Index = ApiType.SuccessResponse<ApiType.PaginationResponse<IndexData>>;
    export type Info = ApiType.SuccessResponse<InfoData>;
    export type Updata = ApiType.SuccessResponse<ApiType.PaginationResponse<IndexData>>;

    export interface IndexData {
      articleId: number;
      title: string;
      articleLink: string;
      tagId: number[];
      tag?: SearchApiType.Response.IndexData[];
      status: ArticleStatus;
      likeCount: number;
      createdAt: string;
      updatedAt: string;
      classification: Classification;
    }
    export interface Classification {
      classificationId: number;
      content: string;
    }
    export interface InfoData {
      articleId: number;
      title: string;
      articleLink: string;
      classificationId: number;
      tagId: number[];
      status: string;
      likeCount: number;
      dislikeCount: number;
      createdAt: string;
      updatedAt: string;
      deleteAt?: any;
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class ArticleApiService extends ApiBase {
  constructor(
    private _http: HttpClient,
    private _searchList: SearchListService,
    private _utile: UtilsService
  ) {
    super('/article');
  }

  create(data: ArticleApiType.Parameter.Create) {
    const body = new FormData();
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const element = data[key];
        body.append(key, element);
      }
    }
    return this._http.post<ArticleApiType.Response.Create>(this._baseUrl, body);
  }
  index(data?: ArticleApiType.Parameter.Index) {
    return combineLatest([
      this._http.get<ArticleApiType.Response.Index>(this._baseUrl, {
        params: data as any,
      }),
      this._searchList.tagSub$.pipe(take(1)),
    ]).pipe<ArticleApiType.Response.Index>(
      concatMap(res => {
        const [articleRes, tagRes] = res;
        console.log(res);
        articleRes.data.data = articleRes.data.data.map(item => {
          item.tag = item.tagId.map(subItem => {
            return tagRes[tagRes.findIndex(findItem => findItem.id === subItem)];
          });
          return item;
        });
        return of(articleRes);
      })
    );
  }
  info(id: number) {
    return this._http.get<ArticleApiType.Response.Info>(`${this._baseUrl}/${id}`);
  }
  updata(data: ArticleApiType.Parameter.Updata) {
    return this._http.put<ArticleApiType.Response.Updata>(`${this._baseUrl}/${data.id}`, {
      ...this._utile.omit(data, 'id'),
      formDataType: true,
    });
  }
}
