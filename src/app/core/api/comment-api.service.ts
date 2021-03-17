import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { type } from 'os';
import { ApiBase, ApiType } from '.';

export namespace CommentApiType {
  export enum CommentStatus {
    ENABLE = 'enable',
    DISABLE = 'disable',
    UNDER_ERVIEW = 'under_review',
  }
  export namespace Parameter {
    export interface Index extends ApiType.PaginationParameter {}
    export interface UpdatePart {
      commentId: number;
      status: CommentStatus;
    }
  }
  export namespace Response {
    export type Index = ApiType.SuccessResponse<ApiType.PaginationResponse<IndexData>>;
    export type UpdatePart = ApiType.SuccessResponse;

    export interface IndexData {
      commentId: number;
      content: string;
      os: string;
      browser: string;
      createdAt: string;
      status: CommentStatus;
      user: User;
      article: Article;
    }
    export interface User {
      userId: number;
      name: string;
    }
    export interface Article {
      articleId: number;
      title: string;
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class CommentApiService extends ApiBase {
  constructor(private _http: HttpClient) {
    super('/comment');
  }
  index(parameter: CommentApiType.Parameter.Index = { page: 0, pageSize: 10 }) {
    return this._http.get<CommentApiType.Response.Index>(this._baseUrl, {
      params: parameter as any,
    });
  }
  updatePart(body: CommentApiType.Parameter.UpdatePart) {
    return this._http.patch<CommentApiType.Response.UpdatePart>(this._baseUrl, body);
  }

  test() {
    const s = 'abcabcbb';
    let b = '';
    let num;
    for (let i = 0; i < s.length; i++) {
      if (b.length > 1) {
        let fg = true;
        const bl = b.length;
        for (let x = 0; x < bl; x++) {
          if (b[x] !== s[i] && fg) {
            b = b + b[x];
          } else {
            fg = false;
          }
        }
        if (b.length > num) {
          num = b.length;
        }
        b = '';
      } else {
        if (s[i] !== s[i + 1]) {
          b = s[i] + s[i + 1];
        }
      }
    }
    return num;
  }
}
