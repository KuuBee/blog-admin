import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleIndexComponent } from './index.component';

describe('IndexComponent', () => {
  let component: ArticleIndexComponent;
  let fixture: ComponentFixture<ArticleIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
