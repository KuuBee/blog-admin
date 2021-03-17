import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyIndexComponent } from './index.component';

describe('IndexComponent', () => {
  let component: ReplyIndexComponent;
  let fixture: ComponentFixture<ReplyIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplyIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplyIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
