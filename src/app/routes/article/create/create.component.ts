import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleApiService } from '@core/api/article-api.service';
import { SearchApiType } from '@core/api/search-api.service';
import { SearchListService } from '@shared/services/search-list.service';
import { FileInput } from 'ngx-material-file-input';
import { combineLatest, Subscription } from 'rxjs';

@Component({
  selector: 'app-article-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class ArticleCreateComponent implements OnInit, OnDestroy {
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _articleApi: ArticleApiService,
    private _searchList: SearchListService
  ) {}

  articleForm = this._fb.group({
    file: [null],
    title: [''],
    classificationId: [],
    tagId: [[]],
  });
  tagIndex: SearchApiType.Response.IndexData[] = [];
  classificationIndex: SearchApiType.Response.IndexData[] = [];
  private _combineLatestSubscribe: Subscription;

  ngOnInit() {
    this.requestSearchIndex();
  }
  ngOnDestroy() {
    if (this._combineLatestSubscribe) this._combineLatestSubscribe.unsubscribe();
  }
  requestSearchIndex() {
    this._combineLatestSubscribe = combineLatest([
      this._searchList.tagSub$,
      this._searchList.classificationSub$,
    ]).subscribe(res => {
      const [tagRes, classificationRes] = res;
      this.tagIndex = tagRes;
      this.classificationIndex = classificationRes;
    });
  }
  submit() {
    console.log(this.articleForm.value);
    const formValue = this.articleForm.value;
    this._articleApi
      .create({
        ...formValue,
        file: (formValue.file as FileInput)?.files?.[0],
      })
      .subscribe(res => {
        console.log(res);
        this._router.navigateByUrl('/article/index');
      });
  }
}
