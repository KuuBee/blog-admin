import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TagApiService, TagStatus } from '@core/api/tag-api.service';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss'],
})
export class CreateDialogComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private _tagApi: TagApiService,
    private _matDialogRef: MatDialogRef<CreateDialogComponent>
  ) {}
  tagForm = this._formBuilder.group({
    name: ['', [Validators.required]],
    status: [true],
  });

  ngOnInit(): void {}
  submit() {
    console.log(this.tagForm.value);
    const formValue = this.tagForm.value;
    this._tagApi
      .create({
        name: formValue.name,
        status: formValue.status ? TagStatus.ENABLE : TagStatus.DISABLE,
      })
      .subscribe(res => {
        console.log(res);
        this._matDialogRef.close();
      });
  }
}
