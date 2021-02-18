import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleApiService, ArticleApiType } from '@core/api/article-api.service';
import { SearchApiType } from '@core/api/search-api.service';
import { SearchListService } from '@shared/services/search-list.service';
import { combineLatest, Subscription } from 'rxjs';

@Component({
  selector: 'app-article-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class ArticleUpdateComponent implements OnInit, OnDestroy {
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _articleApi: ArticleApiService,
    private _formBuilder: FormBuilder,
    private _searchList: SearchListService,
    private _router: Router
  ) {}
  articleId: number;
  articleForm = this._formBuilder.group({
    file: [null],
    title: [''],
    classificationId: [],
    tagId: [[]],
  });
  tagIndex: SearchApiType.Response.IndexData[] = [];
  classificationIndex: SearchApiType.Response.IndexData[] = [];
  private _combineLatestSubscribe: Subscription;

  ngOnInit() {
    this._activatedRoute.params.subscribe(res => {
      this.articleId = res.id;
      this.requestSearchIndex();
      this.requestArticleInfo();
    });
  }
  ngOnDestroy() {
    if (this._combineLatestSubscribe) return this._combineLatestSubscribe.unsubscribe();
  }
  requestArticleInfo() {
    this._articleApi.info(this.articleId).subscribe(res => {
      console.log(res);
      const { title, tagId, classificationId } = res.data;
      this.articleForm.setValue({
        title,
        tagId,
        classificationId,
        file: null,
      });
    });
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
    const submitData: ArticleApiType.Parameter.Updata = {
      ...this.articleForm.value,
      id: this.articleId,
      file: this.articleForm.value.file.files[0],
    };
    this._articleApi.updata(submitData).subscribe(res => {
      this._router.navigateByUrl('/article/index');
    });
  }
}
