import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendLinkIndexComponent } from './index.component';

describe('IndexComponent', () => {
  let component: FriendLinkIndexComponent;
  let fixture: ComponentFixture<FriendLinkIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendLinkIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendLinkIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
