import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleUpdateComponent } from './update.component';

describe('UpdateComponent', () => {
  let component: ArticleUpdateComponent;
  let fixture: ComponentFixture<ArticleUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
