import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiType } from '.';

export namespace AuthApiType {
  export namespace Parameter {
    export interface Create {
      password: string;
      name: string;
    }
  }
  export namespace Response {
    export type Create = ApiType.SuccessResponse<CreateData>;
    export interface CreateData {
      userId: number;
      accessToken: string;
      name: string;
      avatar: string | null;
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor(private _http: HttpClient) {}
  create(data: AuthApiType.Parameter.Create) {
    return this._http.post<AuthApiType.Response.Create>('/auth', data);
  }
}
