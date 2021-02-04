/*
 * @Descripttion: type
 * @Author: 杨湛杰
 * @Date: 2021-02-02 16:44:37
 * @LastEditors: 杨湛杰
 * @LastEditTime: 2021-02-02 16:44:38
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
    data: T;
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
