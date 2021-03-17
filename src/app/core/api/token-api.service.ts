import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiBase, ApiType } from '.';

export namespace TokenApiType {
  export namespace Parameter {
    export interface Create {
      password: string;
      name: string;
    }
  }
  export namespace Response {
    export type Create = ApiType.SuccessResponse<CreateData>;
    export interface CreateData {
      accessToken: string;
      avatar: string;
      email: string;
      name: string;
      userId: 1;
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class TokenApiService extends ApiBase {
  constructor(private _http: HttpClient) {
    super('/token');
  }
  create(data: TokenApiType.Parameter.Create) {
    return this._http.post<TokenApiType.Response.Create>(this._baseUrl, data);
  }
}
