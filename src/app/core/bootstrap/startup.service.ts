import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { combineLatest, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MenuService } from './menu.service';
import { SettingsService } from './settings.service';
import { AssetsApiService, AssetsApiType } from '@core/api/assets-api.service';
import { SearchListService } from '@shared/services/search-list.service';

@Injectable({
  providedIn: 'root',
})
export class StartupService {
  constructor(
    private menu: MenuService,
    private http: HttpClient,
    private settings: SettingsService,
    private _searchList: SearchListService
  ) {}

  load(): Promise<any> {
    return new Promise((resolve, reject) => {
      combineLatest([this.http.get<any>('./assets/data/menu.json'), this._searchList.init()])
        // .getMenu()
        .pipe(
          catchError(res => {
            resolve(null);
            return throwError(res);
          })
        )
        .subscribe(
          res => {
            const [menuRes] = res;

            this.menu.recursMenuForTranslation(menuRes.menu, 'menu');
            this.menu.set(menuRes.menu);

            // Refresh user info
            // In a real app, user data will be fetched from API
            this.settings.setUser({
              id: 1,
              name: 'Zongbin',
              email: 'nzb329@163.com',
              avatar: './assets/images/avatar.jpg',
            });
            // resolve(null);
          },
          () => reject(),
          () => resolve(null)
        );
    });
  }
}
