import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiType } from '.';

export namespace AssetsApiType {
  export namespace Parameter {}
  export namespace Response {
    export type Menu = ApiType.SuccessResponse<{
      menu: MenuData[];
    }>;
    export interface MenuData {
      route: string;
      name: string;
      type: 'link' | 'sub' | 'extLink' | 'extTabLink';
      icon: string;
      label?: MenuTag;
      badge?: MenuTag;
      children?: MenuChildrenItem[];
    }
    export interface MenuChildrenItem {
      route: string;
      name: string;
      type: 'link' | 'sub' | 'extLink' | 'extTabLink';
      children?: MenuChildrenItem[];
    }
    export interface MenuTag {
      color: string; // Background Color
      value: string;
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class AssetsApiService {
  constructor(private _http: HttpClient) {}
  private readonly baseUrl = '/assets';
  getMenu() {
    return this._http.get<AssetsApiType.Response.Menu>(`${this.baseUrl}/menu`);
  }
}
