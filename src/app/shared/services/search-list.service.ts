import { Injectable } from '@angular/core';
import { SearchApiService, SearchApiType } from '@core/api/search-api.service';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { LocalStorageService } from './storage.service';

type SearchData = SearchApiType.Response.IndexData[];
const SearchType = SearchApiType.SearchType;

@Injectable({
  providedIn: 'root',
})
export class SearchListService {
  constructor(private _searchApi: SearchApiService, private _localStorage: LocalStorageService) {}

  // BehaviorSubject 用于缓存上一次的值
  tagSub$ = new BehaviorSubject<SearchData>([]);
  classificationSub$ = new BehaviorSubject<SearchData>([]);
  articleSub$ = new BehaviorSubject<SearchData>([]);

  // 初始化
  init() {
    const obs$ = new Observable(obs => {
      if (!this._localStorage.get('jwt')?.token) return obs.complete();

      const subscription = combineLatest([
        this._searchApi.index(SearchType.TAG),
        this._searchApi.index(SearchType.CLASSIFICATION),
        this._searchApi.index(SearchType.ARTICLE),
      ]).subscribe(
        res => {
          const [{ data: tagData }, { data: classificationData }, { data: articleData }] = res;
          this.tagSub$.next(tagData);
          this.classificationSub$.next(classificationData);
          this.articleSub$.next(articleData);
          subscription.unsubscribe();
          obs.next();
          obs.complete();
        },
        err => obs.error(err),
        () => obs.complete()
      );
    });
    return obs$;
  }

  getData(type: SearchApiType.SearchType) {
    switch (type) {
      case SearchType.TAG:
        break;

      default:
        break;
    }
  }
}
