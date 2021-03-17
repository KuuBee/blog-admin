import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {
  ClassificationApiService,
  ClassificationStatus,
} from '@core/api/classification-api.service';
import { SearchApiType } from '@core/api/search-api.service';
import { SearchListService } from '@shared/services/search-list.service';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss'],
})
export class CreateDialogComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private _classificationApi: ClassificationApiService,
    private _matDialogRef: MatDialogRef<CreateDialogComponent>,
    private _searchList: SearchListService
  ) {}
  classificationForm = this._formBuilder.group({
    name: ['', [Validators.required]],
    status: [true],
  });

  ngOnInit(): void {}
  submit() {
    const formValue = this.classificationForm.value;
    this._classificationApi
      .create({
        name: formValue.name,
        status: formValue.status ? ClassificationStatus.ENABLE : ClassificationStatus.DISABLE,
      })
      .subscribe(() => {
        this._searchList.update(SearchApiType.SearchType.CLASSIFICATION);
        this._matDialogRef.close();
      });
  }
}
