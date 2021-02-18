/*
 * @Descripttion: type
 * @Author: 杨湛杰
 * @Date: 2021-02-02 16:44:37
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-02-05 11:25:22
 */
import { HttpErrorResponse } from '@angular/common/http';

export namespace ApiType {
  export interface SuccessResponse<T = any> {
    statusCode: number;
    message: string;
    data: T;
  }
  export interface ErrorResponse<T = null> extends HttpErrorResponse {
    error: _ErrorType<T>;
  }
  interface _ErrorType<T> {
    data: T;
    message: string | string[];
    path: string;
    statusCode: number;
  }
  export interface PaginationParameter {
    page: string | number;
    pageSize: string | number;
  }
  export interface PaginationResponse<T> {
    data: T[];
    pagination: Pagination;
  }
  export interface Pagination {
    count: number;
    currentPage: number;
    perPage: number;
    total: number;
    totalPages: number;
  }
}
export class ApiBase {
  constructor(baseUrl: string) {
    this._baseUrl = baseUrl;
  }
  protected _baseUrl: string;
}
